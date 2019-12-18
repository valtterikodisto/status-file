const packageRouter = require('express').Router()

packageRouter.get('/:name', (request, response, next) => {
  const packages = request.app.get('packages')
  const { name } = request.params
  const pack = packages.find(pack => pack.name === name)
  if (!pack) {
    return next()
  }

  response.render('package', { ...pack, cache: true, filename: name })
})

module.exports = packageRouter
