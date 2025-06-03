import '@testing-library/jest-dom';

import { server } from './src/mocks/server';
import { initFetchedData } from './test/mocks';
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
