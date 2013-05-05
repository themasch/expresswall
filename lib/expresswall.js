var debug = require('debug')('expresswall')

var _ = function(config)
{
    if(!(this instanceof _)) {
        return new _(config)
    }
    this.config = config
}

_.prototype.setToken = function(request, token)
{
    if(request === undefined || typeof request != 'object') {
        throw new TypeError('first parameter is expected to be an object')
    }
    if(!request.session || typeof request.session != 'object') {
        throw new TypeError('session not started')
    }
    if(token === undefined || token === true) {
        token = { authorized: true }
    }
    if(token === false) {
        token = { authorized: false }
    }
    debug('setToken: ' + JSON.stringify(token))
    if(token.authorized === undefined) {
        throw new TypeError('token needs to contain the boolean `authorized` field')
    }
    request.session.exwall_token = token
    return this
}
_.prototype.removeToken = function(request)
{
    if(this.hasToken(request)) {
        delete request.session.exwall_token
    }
    return this
}

_.prototype.hasToken = function(request)
{
    if(request === undefined || typeof request != 'object') {
        return false
    }
    if(!request.session || typeof request.session != 'object') {
        return false
    }
    return(request.session && request.session.exwall_token)

}

_.prototype.middleware = function()
{
    var config = this.config
    var defaults = {
        secured: false
    } || config.areas.defaults
    var self = this

    return function(req, res, next) {
        debug(req.url)
        var area = defaults
        for(var name in config.areas) {
            var tmpArea = config.areas[name]
            if(!tmpArea.pattern) {
                continue
            }
            if(req.url.match(tmpArea.pattern)) {
                debug('area: ' + name)
                area = tmpArea
                break
            }
        }
        if(!area.secured) {
            debug('not secured')
            return next()
        }
        if(self.hasToken(req) && req.session.exwall_token.authorized === true) {
            debug('authorized')
            return next()
        }
        if(area.redirect_to_login) {
            debug('redirect to: %s', (area.login_path || '/login'))
            res.redirect(area.login_path || '/login')
        }
    }

}
module.exports = _
