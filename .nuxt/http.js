import KY from 'ky-universal'

class HTTP {
  constructor(defaults, ky = KY) {
    this._defaults = {
      hooks: {},
      ...defaults
    }

    this._ky = ky
  }

  setHeader(name, value) {
    if (!value) {
      delete this._defaults.headers[name];
    } else {
      this._defaults.headers[name] = value
    }
  }

  setToken(token, type) {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('authorization', value)
  }

  _hook(name, fn) {
    if (!this._defaults.hooks[name]) {
      this._defaults.hooks[name] = []
    }
    this._defaults.hooks[name].push(fn)
  }

  onRequest(fn) {
    this._hook('beforeRequest', fn)
  }

  onResponse(fn) {
    this._hook('afterResponse', fn)
  }

  onError(fn) {
    this._hook('onError', fn)
  }
}

for (let method of ['get', 'head', 'delete', 'post', 'put', 'patch']) {
  const hasBody = ['post', 'put', 'patch'].includes(method)

  HTTP.prototype[method] = async function (url, arg1, arg2) {
    let options

    if (!hasBody) {
      options = arg1
    } else {
      options = arg2 || {}
      if (arg1 !== undefined) {
        if (arg1.constructor === Object) {
          options.json = arg1
        } else {
          options.body = arg1
        }
      }
    }

    const _options = { ...this._defaults, ...options }

    if (/^https?/.test(url)) {
      delete _options.prefixUrl
    }

    try {
      const response = await this._ky[method](url, _options)
      return response
    } catch (error) {
      // Call onError hook
      if (_options.hooks.onError) {
        _options.hooks.onError.forEach(fn => fn(error))
      }
      // Throw error
      throw error
    }
  }

  HTTP.prototype['$' + method] = function (url, arg1, arg2) {
    return this[method](url, arg1, arg2).then(res => res.json())
  }
}

export default (ctx, inject) => {
  // prefixUrl
  const prefixUrl = process.browser
      ? 'http://localhost:3000/'
      : (process.env._HTTP_BASE_URL_ || 'http://localhost:3000/')

  // Defaults
  const defaults = {
    retry: 0,
    timeout: process.server ? false : false,
    prefixUrl,
    headers: {}
  }

  // Proxy SSR request headers headers
  defaults.headers = (ctx.req && ctx.req.headers) ? { ...ctx.req.headers } : {}
  delete defaults.headers['accept']
  delete defaults.headers['host']
  delete defaults.headers['cf-ray']
  delete defaults.headers['cf-connecting-ip']
  delete defaults.headers['content-length']

  if (process.server) {
    // Don't accept brotli encoding because Node can't parse it
    defaults.headers['accept-encoding'] = 'gzip, deflate'
  }

  // Create new HTTP instance
  const http = new HTTP(defaults)

  // Inject http to the context as $http
  ctx.$http = http
  inject('http', http)
}
