var assert = require('assert')
  , wall   = require('./lib.js')

describe('expresswall', function() {
    var w;
    beforeEach(function() {
        w = wall()
    })
    describe('#setToken', function() {
        it('has a setToken function', function() {
            assert.equal(typeof w.setToken, 'function')
        })
        it('requires an object as the first parameter', function() {
            assert.throws(function() {
                w.setToken('not an object')
            }, /to be an object/)
            assert.throws(function() {
                w.setToken()
            }, /to be an object/)
            try {
                assert.doesNotThrow(function() {
                    w.setToken({})
                }, /to be an object/)
            }
            catch(e) { // this throws TypeErrors because of other failures
                if(!(e instanceof TypeError)) {
                    throw e
                }
            }
        })
        it('requires a session key', function() {
            assert.throws(function() {
                w.setToken({})
            }, /session/)
            assert.throws(function() {
                w.setToken({session: 'doof'})
            }, /session/)
            assert.doesNotThrow(function() {
                w.setToken({session: {}})
            }, /session/)
        })
        it('sets the token', function() {
            var req = {session: {}}
            w.setToken(req)
            assert.ok(req.session.exwall_token !== undefined)
        })
        it('requires the `authorized` field in 2nd argument', function() {
            var req = {session: {}}
            assert.throws(function() {
                w.setToken(req, {})
            }, TypeError)
        })
        it('supports boolean values as the second argument',function() {
            var req = {session: {}}
            w.setToken(req, true)
            assert.equal(req.session.exwall_token.authorized, true)
            req = {session: {}}
            w.setToken(req, false)
            assert.equal(req.session.exwall_token.authorized, false)
        })
        it('works correct with #hasToken (redundant?)', function() {
            var req = {session: {}}
            w.setToken(req)
            assert.ok(w.hasToken(req))
        })
    })
})
