const { isMultiline } = require('./keyMatcher')

const parseName = line => {
  const name = /^Package: (.*)/.exec(line)[1]
  return name
}

const parseDependencies = line => {
  const value = /^Depends: (.*)/.exec(line)[1]
  const dependenciesWithoutVersion = value.split(/\(.*?\)/).join('')
  const dependencies = dependenciesWithoutVersion.split(',')

  const parsedDependencies = dependencies.reduce(
    (array, dependency) => array.concat(parseDependency(dependency)),
    []
  )

  return parsedDependencies
}

const parseDescription = line => {
  if (isMultiline(line)) {
    return line.trim()
  }

  const description = /^Description: (.*)/.exec(line)[1]
  return Array.of(description)
}

const parseDependency = dependency => {
  const dependencyOptions = dependency.split('|')
  const name = dependencyOptions[0].trim()
  const link = false

  const parsedDependency = { name, link, alternatives: [] }

  if (dependencyOptions.length > 1) {
    const alternatives = dependencyOptions.slice(1, dependencyOptions.length)

    alternatives.forEach(alternative => {
      const parsedAlternative = { name: alternative.trim(), link }
      parsedDependency.alternatives = parsedDependency.alternatives.concat(parsedAlternative)
    })
  }

  return parsedDependency
}

module.exports = { parseName, parseDependencies, parseDescription }
