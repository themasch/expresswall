var assert = require('assert')
  , wall   = require('./lib.js')

describe('expresswall', function() {
    var w;
    beforeEach(function() {
        w = wall()
    })
    describe('#hasToken', function() {
        it('has a hasToken function', function() {
            assert.equal(typeof w.hasToken, 'function')
        })
        it('returns false if `request` isn`t an object', function() {
            assert.equal(w.hasToken('asdf'), false);
            assert.equal(w.hasToken(), false);
        })
        it('returns false if `request` does not have a `session` key', function() {
            assert.equal(w.hasToken({}), false);
            assert.equal(w.hasToken({session: 'doof'}), false);
        })
        it('returns true if `request.session` contains the token', function() {
            var req = {session: { exwall_token: {} }}
            assert.ok(w.hasToken(req));
        })
    })
})
