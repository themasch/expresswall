# expresswall [![Build Status](https://travis-ci.org/themasch/expresswall.png?branch=master)](https://travis-ci.org/themasch/expresswall) [![NPM version](https://badge.fury.io/js/bencode.png)](https://npmjs.org/package/bencode)

**expresswall** is a basic authentication middleware for [express.js](https://github.com/visionmedia/express).
It is heavily inspired by parts of [Symfony2's Security component](https://github.com/symfony/Security).

## What?

expresswall takes care of redirecting users to the login or denying access to
secured ressources. You just defined whats secure or public by URL patterns.

## Installation

expresswall can be installed via npm.

```
npm install expresswall
```

## Usage

```js
    var expresswall = require('expresswall')

    …

    var wall = expresswall({
      areas: {
        static: { pattern: /^\/(css|js|font)/ },
        login: { pattern: /^\/login/ },
        secure: {
            pattern: /^\//,
            secured: true,
            redirect_to_login: true
        }
      }
    })

    …

    app.use(express.session({ … }))
    app.use(wall.middleware())
    app.use(app.router)
```

## License
[MIT](http://masch.mit-license.org/)
