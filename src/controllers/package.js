const packageRouter = require('express').Router()

packageRouter.get('/:name', (request, response, next) => {
  const packages = request.app.get('packages')
  const pack = packages.find(pack => pack.name === request.params.name)
  if (!pack) {
    return next()
  }

  response.render('package', pack)
})

module.exports = packageRouter
