const homeRouter = require('express').Router()

homeRouter.get('/', (request, response) => {
  const packages = request.app.get('packages')
  const statusFilePath = request.app.get('statusFilePath')
  response.render('index', { packages, statusFilePath })
})

module.exports = homeRouter
