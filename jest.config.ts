export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: { VITE_API_URL: 'empty', VITE_USERNAME: 'empty', VITE_PASSWORD: 'empty' },
                },
              },
            },
          ],
        },
      },
    ],
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@apis/(.*)': '<rootDir>/src/apis/$1',
    '@globalState/(.*)': '<rootDir>/src/globalState/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
  },
};
