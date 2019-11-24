const isName = line => /^Package: /.test(line)
const isDependencies = line => /^Depends: /.test(line)
const isDescription = (line, currentKey) =>
  /^Description: /.test(line) || (currentKey === 'description' && isMultiline(line))
const isMultiline = line => /^\s/.test(line)
const isEndOfPackage = line => line.trim().length === 0

module.exports = { isName, isDependencies, isDescription, isMultiline, isEndOfPackage }
