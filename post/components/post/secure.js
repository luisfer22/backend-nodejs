const auth = require('../../../auth')
const Controller = require('./index')

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    switch (action) {
      case 'create':
      case 'fetch_own':
        const err = auth.check.logged(req)

        if (err) {
          console.log('logged.statusCode: ', err.cause)
          next(err.cause)
        }
        next()
        break

      case 'update':
        const post = await Controller.list(req.params.id)
        auth.check.own(req, post.user)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}
