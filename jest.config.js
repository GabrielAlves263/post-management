export default {
    testEnvironment: 'node',
    transform: {
        '^.+\\.m?js$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'mjs'],
    testMatch: ['**/__tests__/**/*.test.mjs'],
};
