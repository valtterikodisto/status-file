const addDependantsToPackages = packages => {
  const packageMap = packagesToMap(packages)

  packages.forEach(pack => {
    addPackageAsDependant(pack, packageMap)
  })

  return Array.from(packageMap.values())
}

const packagesToMap = packages => {
  const packageMap = new Map()
  packages.forEach(pack => {
    packageMap.set(pack.name, pack)
  })
  return packageMap
}

const addPackageAsDependant = (dependant, packageMap) => {
  const dependenciesByName = getPackageDependenciesByName(dependant)

  dependenciesByName.forEach(dependencyName => {
    const dependency = packageMap.get(dependencyName)

    if (dependency) {
      const { name } = dependant
      const link = false

      const updatedDependants = dependency.dependants
        ? dependency.dependants.concat({ name, link })
        : Array.of({ name, link })

      packageMap.set(dependency.name, { ...dependency, dependants: updatedDependants })
    }
  })
}

const getPackageDependenciesByName = pack => {
  if (!pack.dependencies || pack.dependencies.length === 0) {
    return []
  }

  const packageDependenciesByName = pack.dependencies.reduce((dependenciesByName, dependency) => {
    const { name, alternatives } = dependency
    const names = [name, ...alternatives.map(a => a.name)]
    return dependenciesByName.concat(names)
  }, [])

  return packageDependenciesByName
}

module.exports = { addDependantsToPackages, packagesToMap }
