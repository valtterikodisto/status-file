const fs = require('fs')
const _ = require('lodash/fp')

const parse = path => {
  return fs
    .readFileSync(path, 'utf-8')
    .trim()
    .split(/\n\s*\n/)
    .map(
      _.compose(
        combineMultiline,
        _.map(_.compose(lineArrayToObject, removeEmpty, splitKeyValue)),
        _.split('\n')
      )
    )
}

const splitKeyValue = _.split(/:\s*(.+)/)

const removeEmpty = _.filter(str => !!str)

const lineArrayToObject = arr =>
  arr.length === 1 ? { value: arr[0] } : { key: arr[0], value: arr[1] }

const combineMultiline = _.reduce((lines, lineObject) => {
  if (lineObject.key) {
    return lines.concat(lineObject)
  }

  const lastItem = lines[lines.length - 1]
  return Object.assign([], lines, {
    [lines.length - 1]: { ...lastItem, value: lastItem.value.concat(lineObject.value) }
  })
}, [])

const parsed = parse('/var/lib/dpkg/status')

console.log(parsed[0])
