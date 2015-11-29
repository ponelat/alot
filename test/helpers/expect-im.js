import expect from 'expect'
import Im, {Collection} from 'immutable'

function objOrImToString(obj) {
  return isImmutable(obj) ? obj.toString() : obj
}

function isImmutable(obj) {
  return obj instanceof Collection
}

let api = {
  toBeImmutableJS() {
      return expect.assert(
        isImmutable(this.actual),
        'expected %s to be an instance of immutable.Collection',
        this.actual)
  },
  toImEqual(expected, msg='', showDiffActual, showDiffExpected) {

    this.toBeImmutableJS(this.actual)
    this.toBeImmutableJS(expected)

    try {
      expect.assert(
        Im.is(this.actual, expected),
        (msg || 'expected %s to equal %s'),
        showDiffActual || this.actual.toString(),
        showDiffExpected || expected.toString())

    } catch (e) {
      // These attributes are consumed by Mocha to produce a diff output.
      e.showDiff = true;
      e.actual = this.actual.toJS(),
      e.expected = expected.toJS();
      throw e;
    }

    return this;
  },
  toImEqualLoosely(expected, msg) {
    var oriActual

    if(!isImmutable(this.actual)) {
      oriActual = clone(this.actual)
      this.actual = Im.fromJS(this.actual)
    }

    var imExpected = Im.fromJS(expected)
    return this.toImEqual(imExpected, 'expected %s to loosely equal %s', oriActual, expected)
  }
}

function clone(obj) {
  if(typeof obj === 'object') {
    return Object.assign({}, obj)
  }
  return obj
}

export default api
