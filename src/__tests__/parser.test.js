const path = require('path')
const statusParser = require('../parser/parser')
const mockFile = path.resolve('src/__tests__/assets/status.part.real')

describe('file is parsed correctly', () => {
  let packages
  beforeAll(async () => {
    packages = await statusParser.parse(mockFile)
  })

  test('contains all packages in order', () => {
    const names = packages.reduce((prev, curr) => prev.concat(curr.name), [])
    expect(names).toEqual(['grub2-common', 'libc6', 'libsm6'])
  })

  test('contains correct description', () => {
    const pack = packages.find(p => p.name === 'grub2-common')
    const expectedDescription = [
      'GRand Unified Bootloader (common files for version 2)',
      'This package contains common files shared by the distinct flavours of GRUB.',
      'The files in this package are specific to GRUB 2, and would break GRUB',
      'Legacy if installed on the same system.'
    ]
    expect(pack.description).toStrictEqual(expectedDescription)
  })

  test('contains correct dependencies with links', () => {
    const pack = packages.find(p => p.name === 'libsm6')
    const expectedDependencies = [
      { name: 'libc6', link: true, alternatives: [] },
      { name: 'libice6', link: false, alternatives: [] },
      { name: 'libuuid1', link: false, alternatives: [] }
    ]
    expect(pack.dependencies).toStrictEqual(expectedDependencies)
  })

  test('contains correct dependants with links', () => {
    const pack = packages.find(p => p.name === 'libc6')
    const expectedDependants = [{ name: 'libsm6', link: true }]
    expect(pack.dependants).toStrictEqual(expectedDependants)
  })
})
