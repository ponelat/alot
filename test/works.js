import expect from 'expect'
import Im from 'immutable'

describe('this', function(){
  it('should work', function(){
    expect({one: 1}).toImEqualLoosely(Im.Map({one: 1}))
  })
})
