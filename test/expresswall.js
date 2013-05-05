var assert = require('assert')
  , wall   = require('./lib.js')

describe('expresswall', function() {
    var w;
    beforeEach(function() {
        w = wall()
    })
    it('does not require the `new` keyworkd', function() {
        assert.ok(w instanceof wall)
    })
})
