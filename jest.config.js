module.exports = {
    roots: ['<rootDir>/backend', '<rootDir>/frontend'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
}
