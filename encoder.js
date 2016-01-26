var fs = require('fs')
var through2 = require('through2')

const EMPTY = 0
const HYPHEN = 45
const DIGITS = [48,57]
const NEWLINE = 74
const LOWERCASE = [97,122]

const LOW_SIX_BITS = 0x3f
const LOW_EIGHT_BITS = 0xff

const CHARSET = []
.concat([EMPTY])
.concat([HYPHEN])
.concat(range(DIGITS))
.concat([NEWLINE])
.concat(range(LOWERCASE)).sort( (a,b) => a > b ? 1 : -1)

const CHARSET_LEN = CHARSET.length

// const ASCII_TO_CHARSET = (new Array(CHARSET_LEN)).map( (_, i) => CHARSET.indexOf(i) || 0))

function range(n) {
  if(Array.isArray(n)) {
    var range = n[1] - n[0] + 1
    var ar = Array.from({length: range})
    return ar.map( (_,i) => n[0] + i)
  }
}

// Test
// encodeFile('list')

module.exports = {
  compress,
  decompress,
  encodeFile,
  decodeFile,
  encodeChunk,
  decodeChunk,
  decodeToAscii,
  encodeFromAscii
}

/**
 * compresses a buffer, to a smaller buffer
 * @param {Buffer}
 * @returns {Buffer}
 */
function compress(buf) {
  // encode to a 6-bit char (iterate over 3-byte... to make 4 chars)
}

/**
 * encodes to our charset from ascii (ours is 6bit)
 * WARNING mutate the original buffer
 * @param {Buffer}
 * @returns {Buffer} 0.75 * buf.length
 * @schema
 * [1111 1100] [0000 1111] [1100 0000] [xxxx xxxx]
 */
function encodeFromAscii(buf) {
  if(!(buf instanceof Buffer))
    throw new Error('encodeFromAscii: Can only handle Buffers')

  var newBuf = buf.slice()
  var rawBuf = buf.slice()
  var counter = 0
  for (var i = 0, len = rawBuf.length; i < len; i += 4) {

    var one = CHARSET.indexOf(rawBuf[i])
    var two = CHARSET.indexOf(rawBuf[i+1])
    var three = CHARSET.indexOf(rawBuf[i+2])
    var four = CHARSET.indexOf(rawBuf[i+3])

    newBuf[counter++] = ( 0xff & ((one << 2)   | (two >>> 4)))
    newBuf[counter++] = ( 0xff & ((two << 4)   | (three >>> 2)))
    newBuf[counter++] = ( 0xff & ((three << 6) |  four))

  }
  return newBuf.slice(0, counter)
}

function numDump(name, num) {
  num = num || name
  console.log(name +'\t', printBin(num), '\t', num.toString(16), '\t', num.toString(10), '"' + String.fromCharCode(num) +'"')
}
function printBin(num) {
  var str = '00000000'.concat(num.toString(2))
  str = str.slice(str.length - 8)
  return str.slice(0,4) + ' ' + str.slice(4)
}

/**
 * Decodes ours to ascii
 * @param {Buffer}
 * @returns {Buffer} 1.25 * buf.length
 * @schema
 * [1111 1100] [0000 1111] [1100 0000] [xxxx xxxx]
 */
function decodeToAscii(buf) {
  if(!(buf instanceof Buffer))
    throw new Error('decodeToAscii: can only handle Buffers')
  var nb = new Buffer(((buf.length * 4) / 3))
  var rawBuf = buf.slice()
  var nbi = 0
  for (var i = 0, len = rawBuf.length; i < len; i += 3) {

    var one = rawBuf[i]
    var two = rawBuf[i+1]
    var three = rawBuf[i+2]

    nb[nbi++] = CHARSET[one >>> 2]
    nb[nbi++] = CHARSET[((one << 6) | (two >>> 4)) & 0xff]
    nb[nbi++] = CHARSET[(((two << 2) ) | (three >>> 6)) &  LOW_SIX_BITS]
    nb[nbi++] = CHARSET[three & LOW_SIX_BITS]

  }
  return nb.slice(0,nbi)
}

/**
 * decompresses a buffer, to a larger buffer
 * @param {Buffer}
 * @returns {Buffer}
 *
 */
function decompress(buf) {
  return buf
}

function encodeFile(file, outfile) {
  fs.createReadStream(file)
  .pipe(through2(encodeChunk))
  .pipe(fs.createWriteStream(outfile || file+'.4bit'))

}

function decodeFile(file, outfile) {
  fs.createReadStream(file)
  .pipe(through2(decodeChunk))
  .pipe(fs.createWriteStream(outfile || file.replace('.4bit', '')))
}


function encodeChunk(chunk, enc, done) {
  var newBuff = new Buffer(chunk.length / 2)
  done(null, chunk)
}

function decodeChunk(chunk, enc, done) {
  done(null, chunk)
}

// /**
//  * Encode a 24bit word into a 18bit word
//  *
//  */
// function encodeWord(buf /* 24bit */) {
//   return buf[0] += 1
//   // return CHARSET[buf[0]] 
//   //   | CHARSET_LEN + CHARSET[buf[1]]
//   //   | 2 * CHARSET_LEN + CHARSET[buf[2]]
//   //   | 3 * CHARSET_LEN + CHARSET[buf[3]]
//   //   | 4 * CHARSET_LEN + CHARSET[buf[4]]
//   //   | 5 * CHARSET_LEN + CHARSET[buf[5]]
// }

// function decodeWord(byte) {
//   var buf = new Buffer(6)
//   buf[0] = CHARSET[]
// }

