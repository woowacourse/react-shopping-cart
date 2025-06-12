import '@testing-library/jest-dom';

import { server } from './src/mocks/server';
import { initFetchedData, mockCartItems } from './test/mocks';
beforeEach(() => {
  initFetchedData();
  localStorage.setItem('checkedCartIds', JSON.stringify(mockCartItems.map((item) => item.id)));
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
