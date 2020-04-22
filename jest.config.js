module.exports = {
    // A preset that is used as a base for Jest's configuration
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['./src/**/*.{js,vue,ts}'],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['lcov'],

    // Make calling deprecated APIs throw helpful error messages
    errorOnDeprecated: true,
}
