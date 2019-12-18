const cluster = require('cluster')
const cpus = require('os').cpus()
const logger = require('./src/logger/logger')

const start = fn => {
  if (cluster.isMaster) {
    logger.success(`Master ${process.pid} is running`)

    cpus.forEach(cluster.fork)

    cluster.on('exit', worker => logger.info(`Worker ${worker.process.pid} died`))
  } else {
    fn()

    logger.success(`Worker ${process.pid} started`)
  }
}

module.exports = start
