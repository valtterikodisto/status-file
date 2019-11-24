const red = '\x1b[31m'
const green = '\x1b[32m'
const blue = '\x1b[34m'
const reset = '\x1b[0m'

const error = (message, err) => {
  console.log(red, `ERROR: ${message}`, reset, err)
}

const success = message => {
  console.log(green, 'SUCCESS', reset, message)
}

const info = message => {
  console.log(blue, 'INFO', reset, message)
}

module.exports = { error, success, info }
