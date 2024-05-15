export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@apis/(.*)': '<rootDir>/src/apis/$1',
    '@recoil/(.*)': '<rootDir>/src/recoil/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
  },
};
