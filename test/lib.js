var fs = require('fs')

if(fs.existsSync(__dirname + '/../lib-cov')) {
    module.exports = require('../lib-cov/expresswall.js')
} else {
    module.exports = require('../lib/expresswall.js')
}
