const app = require('./src/app')
const logger = require('./src/logger/logger')
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  logger.success(`App is running. You can access app from http://localhost:${PORT}`)
})
