const logger = require('../logger/logger')

module.exports = (request, response, next) => {
  logger.info(`${request.method}: ${request.url}`)
  next()
}
