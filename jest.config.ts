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
                  env: {
                    VITE_CART_API_URL: 'empty',
                    VITE_USERNAME: 'empty',
                    VITE_PASSWORD: 'empty',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/style/(.*)$': '<rootDir>/src/style/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
};
