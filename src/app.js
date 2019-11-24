const path = require('path')
const express = require('express')
const app = express()
const statusParser = require('./parser/parser')
const logger = require('./logger/logger')
const pathResolver = require('./utils/pathResolver')

const requestLogger = require('./middlewares/requestLogger')

const homeRouter = require('./controllers/home')
const packageRouter = require('./controllers/package')
const notFoundRouter = require('./controllers/notFound')

const statusFilePath = pathResolver.getPathToStatusFile()

statusParser
  .parse(statusFilePath)
  .then(packages => {
    app.set('packages', packages)
    logger.success('Status file parsed successfully')
  })
  .catch(error => {
    logger.error('Could not parse status file', error)
    process.exit(1)
  })

app.set('statusFilePath', statusFilePath)
app.set('views', 'src/views')
app.set('view engine', 'pug')

app.use(requestLogger)

app.use('/', homeRouter)
app.use('/package', packageRouter)
app.use('*', notFoundRouter)

module.exports = app
