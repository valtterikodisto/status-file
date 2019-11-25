const notFound = require('express').Router()
const logger = require('../logger/logger')

notFound.get('*', (request, response) => {
  logger.error(`Could not find ${request.url}`)
  response.status(404).render('notFound')
})

module.exports = notFound
