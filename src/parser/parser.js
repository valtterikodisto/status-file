const { once } = require('events')
const fs = require('fs')
const readline = require('readline')
const { isName, isDescription, isDependencies, isEndOfPackage } = require('./keyMatcher')
const { parseName, parseDescription, parseDependencies } = require('./lineParser')
const { addDependantsToPackages } = require('./dependantAdder')
const { addLinksToPackages } = require('./linkAdder')

const parse = async path => {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(path, 'utf-8'),
      crlfDelay: Infinity
    })

    let packages = []
    let currentPackage = {}
    let currentKey

    rl.on('line', line => {
      const property = parseLine(line, currentKey)
      currentKey = property.key

      const updatedPackage = addPropertyToPackage(currentPackage, property)
      currentPackage = updatedPackage

      if (currentPackage.ready) {
        packages = updatePackages(packages, currentPackage)
        currentPackage = {}
      }
    })

    await once(rl, 'close')

    const packagesWithDependants = addDependantsToPackages(packages)
    const packagesWithLinks = addLinksToPackages(packagesWithDependants)
    const sortedPackages = packagesWithLinks.sort((a, b) => a.name.localeCompare(b.name))

    return sortedPackages
  } catch (error) {
    throw error
  }
}

const parseLine = (line, currentKey) => {
  if (isName(line)) {
    return {
      key: 'name',
      value: parseName(line)
    }
  } else if (isDependencies(line)) {
    return {
      key: 'dependencies',
      value: parseDependencies(line)
    }
  } else if (isDescription(line, currentKey)) {
    return {
      key: 'description',
      value: parseDescription(line)
    }
  } else if (isEndOfPackage(line)) {
    return {
      key: 'ready',
      value: true
    }
  } else {
    return {
      key: null,
      value: null
    }
  }
}

const addPropertyToPackage = (currentPackage, property) => {
  const { key, value } = property
  if (key) {
    const newValue = key in currentPackage ? currentPackage[key].concat(value) : value
    const updatedPackage = Object.assign(currentPackage, { [key]: newValue })

    return updatedPackage
  } else {
    return currentPackage
  }
}

const updatePackages = (packages, currentPackage) => {
  const { ready, ...packageToBeAdded } = currentPackage
  return packages.concat(packageToBeAdded)
}

module.exports = { parse }
