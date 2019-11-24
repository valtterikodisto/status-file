const { packagesToMap } = require('./dependantAdder')

const addLinksToPackages = packages => {
  const packageMap = packagesToMap(packages)

  packages.forEach(pack => {
    const dependantsByName = getPackageDependantsByName(pack)

    const dependenciesWithLinkInfo = addLinkToDependencies(pack.dependencies, packageMap)
    const dependantsWithLinkInfo = addLink(dependantsByName, packageMap)

    packageMap.set(pack.name, {
      ...pack,
      dependencies: dependenciesWithLinkInfo,
      dependants: dependantsWithLinkInfo
    })
  })

  return Array.from(packageMap.values())
}

const getPackageDependantsByName = pack => {
  if (pack.dependants) {
    return pack.dependants.map(dependant => dependant.name)
  }

  return []
}

const addLink = (packagesByName, packageMap) => {
  const packagesWithLinkInfo = packagesByName.reduce((withLinkInfo, packageName) => {
    const link = packageExists(packageName, packageMap)
    return withLinkInfo.concat({ name: packageName, link })
  }, [])

  return packagesWithLinkInfo
}

const addLinkToDependencies = (dependencies, packageMap) => {
  if (!dependencies) {
    return []
  }

  const dependenciesWithLinkInfo = []
  dependencies.forEach(dependency => {
    const alternativesByName = dependency.alternatives
      ? dependency.alternatives.map(a => a.name)
      : []

    const dependencyWithLinkInfo = {
      ...dependency,
      link: packageExists(dependency.name, packageMap)
    }

    dependenciesWithLinkInfo.push({
      ...dependencyWithLinkInfo,
      alternatives: addLink(alternativesByName, packageMap)
    })
  })

  return dependenciesWithLinkInfo
}

const packageExists = (packageName, packageMap) => !!packageMap.get(packageName)

module.exports = { addLinksToPackages }
