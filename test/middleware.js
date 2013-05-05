var assert = require('assert')
  , wall   = require('./lib.js')
var config = {
  areas: {
    skipthis: {
        secure: true,
        redirect_to_login: true,
        login_path: 'uncool_login_path'
    },
    static: {
        pattern: /^\/(css|js|font)/
    },
    no_redir: {
        pattern: /^\/dont/,
        secured: true,
        redirect_to_login: false
    },
    secure: {
        pattern: /^\//,
        secured: true,
        redirect_to_login: true,
        login_path: 'cool_login_path'
    },
  }
}
describe('expresswall', function() {
    var w;
    beforeEach(function() {
        w = wall(config)
    })
    describe('#middleware', function() {
        it('returns as function', function() {
            assert.equal(typeof w.middleware(), 'function')
        })
        it('should not redirect for non-secure areas', function(done) {
            var req = { url: '/css/style.css'}
              , res = {
                redirect: function() { assert.fail(); done(); }
              }
              , mw = w.middleware()
            mw(req, res, function() {
                done()
            })
        })
        it('should redirect for secured areas', function(done) {
            var req = {
                    url: '/cools/secure/path'
                }
              , res = {
                    redirect: function(url) {
                        assert.equal(url, 'cool_login_path')
                        done()
                    }
                }
              , mw = w.middleware()

            mw(req, res, function() {
                assert.fail()
                done()
            })
        })
        it('should not redirect for secured areas when authorized', function(done) {
            var req = {
                    url: '/cool/secure/path',
                    session: {
                        exwall_token: {
                            authorized: true
                        }
                    }
                }
              , res = {
                    redirect: function(url) {
                        assert.fail()
                        done()
                    },
                    end: done
                }
              , mw = w.middleware()

            mw(req, res, function() {
                done()
            })

        })
        it('should send a 403 header for secured paths', function(done) {
            var req = {
                    url: '/dont/redirect',
                }
              , res = {
                    redirect: function() {
                        throw Error('redirect called')
                        done()
                    },
                    writeHead: function(code) {
                        assert.equal(code, 403)
                    },
                    end: done
                }
              , mw = w.middleware()

            mw(req, res, function() {
                throw Error("next() called")
                done()
            })

        })
    })
})
