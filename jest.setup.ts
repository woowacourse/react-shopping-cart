import '@testing-library/jest-dom';
import { server } from './src/mocks/server';
import { initFetchedData } from './test/mocks';

jest.mock('./src/constants/evt.ts', () => ({
  VITE_BASE_URL: 'http://localhost:1234',
}));

beforeEach(() => {
  initFetchedData();
});

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
