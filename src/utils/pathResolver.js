const path = require('path')
const { existsSync } = require('fs')
const logger = require('../logger/logger')

const getPathToStatusFile = () => {
  const defaultPath = '/var/lib/dpkg/status'

  try {
    const pathToStatusFile = path.resolve(process.argv[2] || defaultPath)
    if (!existsSync(pathToStatusFile)) {
      throw new Error(`No such file: ${pathToStatusFile}`)
    }

    logger.success(`Resolved path to status file: ${pathToStatusFile}`)

    return pathToStatusFile
  } catch (error) {
    logger.error('Could not resolve path to status file', error)
    process.exit(1)
  }
}

module.exports = { getPathToStatusFile }
