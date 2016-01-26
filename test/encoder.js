import expect from 'expect'
import Im from 'immutable'

import DomainZip from '../encoder.js'
const STR = 'bbcdfinvidloznmzlkvfaffkpzonbopdsvnivdybzazzyxvsnfsxpmbnobpqfvavvqlbmnzmlxifnsewasskcsumisskcgouieqc' // 10 points if you can figure out the patterns (caution, it was generated)
const ABs = 'babababababababababababababababababababababababababababababababababababababababababababababababababab' // 10 points if you can figure out the patterns (caution, it was generated)
const As = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // 10 points if you can figure out the patterns (caution, it was generated)

describe.skip('compressor', function(){

  it('should have no loss of data, in compress/decompress', function(){
    var plain = new Buffer(STR)
    var compressed = DomainZip.compress(plain)
    expect(DomainZip.decompress(compressed)).toEqual(plain)
  })

  it('should compress the data', function(){
    var plain = new Buffer(STR)
    var compressed = DomainZip.compress(plain)
    expect(compressed.length).toBeLessThan(plain.length)
  })

})

describe('encode', function(){

  it('should handle the smallest case of four bytes', function(){
    var str = 'abcd'
    var encoded = DomainZip.encodeFromAscii(new Buffer(str))
    expect(str.length).toEqual(4)
    expect(encoded.length).toEqual(3)

    expect(DomainZip.decodeToAscii(encoded).toString('ascii')).toEqual('abcd')
  })

  xit('should handle non-multiples of 4', function(){
    var str = '12345'
    var encoded = DomainZip.encodeFromAscii(new Buffer(str))
    expect(str.length).toEqual(5)
    expect(encoded.length).toEqual(6)

    expect(DomainZip.decodeToAscii(encoded).toString('ascii')).toEqual('12345')
  })

  it('should reduce the buffer by 0.75', function(){
    var encoded = DomainZip.encodeFromAscii(new Buffer(STR))
    expect(STR.length).toEqual(100)
    expect(encoded.length).toEqual(75)
  })

  it('should loose no data', function(){
    var encoded = DomainZip.encodeFromAscii(new Buffer(As))
    expect(As.length).toEqual(100)
    expect(DomainZip.decodeToAscii(encoded).toString('ascii')).toEqual(As)
  })
    
})



// memoize.mempad = {}
// function memoize(fn) {
//   var M = memoize.mempad[fn] = {}
//   return function (...args) {
//     if(!M[args])  {
//       M[args] = fn(...args)
//     }
//     return M[args]
//   }
// }

// const fib = memoize(_fib)
// function _fib(n) {
//   return n < 1 ? 1 
//        : n < 2 ? 1 
//        : n < 3 ? 2
//        : fib(n-2) + fib(n-1) 
// }
