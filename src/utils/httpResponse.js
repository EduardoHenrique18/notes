const { ServerError } = require('./errors')

module.exports = class HttpResponse {
  constructor (res) {
    this.res = res
  }

  ok (data) {
    return this.res.send({
      statusCode: 200,
      data,
      error: ''
    })
  }

  badRequest (error) {
    return this.res.send({
      statusCode: 400,
      data: {},
      error: error.message
    })
  }

  conflictError (error) {
    return this.res.send({
      statusCode: 409,
      data: {},
      error: error.message
    })
  }

  unauthorizedError (error) {
    return this.res.send({
      statusCode: 401,
      data: {},
      error: error.message
    })
  }

  serverError () {
    return this.res.send({
      statusCode: 500,
      data: {},
      error: new ServerError().message
    })
  }
}
