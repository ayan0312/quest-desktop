module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    globals: {
        __DEV__: true,
        __TEST__: true,
        __VERSION__: require('./package.json').version,
    },
    rootDir: __dirname,
    testMatch: ['<rootDir>/packages/**/__tests__/**/*.ts?(x)'],
    moduleNameMapper: {
        '^@yukino-desktop/(.*?)$': '<rootDir>/packages/$1/src'
    },
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    collectCoverage: false
}
