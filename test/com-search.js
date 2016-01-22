import expect from 'expect'
import Im from 'immutable'
import comSearch from '../server/com-search'

describe('com search', function(){
  it('should return results', function(done){
    comSearch.searchComs({str: '^cold.*s$', page:0},function (err, payload) {
      expect(err).toBe(null)
      expect(payload).toImEqualLoosely({
        page: 0,
        pageSize: 10,
        str: '^cold.*s$',
        totalResults: 1,
        results: [
          'coldtablets'
        ]
      })
      done()
    })
  })

})

describe.only('searchBuffer', function(){
  before(function(){
      this.method = comSearch.searchBuffer
  })
  it('should return multiple matches', function(){
    var buf = new Buffer('one\ntwo\nthree', {encoding: 'utf-8'})
    throw new Error('wat')
    var str = '.*'
    var res = this.method(str, buf)
    expect(res).toEqual({
      hi: 1
    })
  })
})

