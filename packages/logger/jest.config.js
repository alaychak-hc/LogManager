const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  testRegex: '(/__tests__/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: ['/.history.', '/lib/', '/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // moduleNameMapper: {
  //   '/^@enums/(.*)$/': 'D:\\Jira API\\src\\@enums\\$1',
  // },
  resolver: undefined,
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  // TODO: Re-enable coverage
  // collectCoverage: false,
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  // globalSetup: './__tests__/configuration/Global Setup.ts',
  // globalTeardown: './__tests__/configuration/Global Teardown.ts',
  // testEnvironment: '<rootDir>/__tests__/configuration/Global Environment.ts',
};
