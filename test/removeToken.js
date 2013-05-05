var assert = require('assert')
  , wall   = require('./lib.js')

describe('expresswall', function() {
    var w;
    beforeEach(function() {
        w = wall()
    })
    describe('#removeToken', function() {
        it('has a removeToken function', function() {
            assert.equal(typeof w.removeToken, 'function')
        })
        it('works if `request` isn`t an object', function() {
            w.removeToken('asdf')
            w.removeToken()
        })
        it('works if `request.session` isn`t an object', function() {
            w.removeToken({})
            w.removeToken({session: 'doof'})
        })
        it('works if `request.session` contains the token', function() {
            var req = {session: { exwall_token: {} }}
            w.removeToken(req)
            assert.equal(req.session.exwall_token, undefined)
        })
    })
})
