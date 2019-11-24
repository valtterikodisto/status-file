const notFound = require('express').Router()

notFound.get('*', (request, response) => {
  response.status(404).render('notFound')
})

module.exports = notFound
