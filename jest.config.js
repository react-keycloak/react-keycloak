module.exports = {
  projects: [
    {
      displayName: 'react-keycloak-core',
      roots: ['./packages/core'],
      testMatch: ['<rootDir>/packages/core/**/*.test.js'],
      setupFiles: ['<rootDir>/packages/core/test/setup.js'],
      setupFilesAfterEnv: ['<rootDir>/packages/core/test/setupAfterEnv.js'],
      automock: false
    },
    {
      displayName: 'react-keycloak-web',
      roots: ['./packages/web'],
      testMatch: ['<rootDir>/packages/web/**/*.test.js'],
      setupFiles: ['<rootDir>/packages/web/test/setup.js'],
      setupFilesAfterEnv: ['<rootDir>/packages/web/test/setupAfterEnv.js'],
      coveragePathIgnorePatterns: ['<rootDir>/packages/core/dist/']
    }
  ]
}
