import { vi } from 'vitest';
import server from './mocks/server';
import CartItemLocalStorage, {
  CART_ITEM_SELECTED_KEY,
  CartItemSelected,
} from './services/CartItemLocalStorage';

let mockedStorage: CartItemSelected = {};

beforeAll(() => {
  server.listen();

  vi.spyOn(CartItemLocalStorage, 'get').mockImplementation((key: string) => {
    if (key === CART_ITEM_SELECTED_KEY) {
      const isStorageEmpty = Object.keys(mockedStorage).length === 0;
      return isStorageEmpty ? undefined : mockedStorage;
    }
    return undefined;
  });

  vi.spyOn(CartItemLocalStorage, 'set').mockImplementation(
    (key: string, value: CartItemSelected) => {
      if (key === CART_ITEM_SELECTED_KEY) {
        mockedStorage = value;
      }
    }
  );

  vi.spyOn(CartItemLocalStorage, 'delete').mockImplementation((key, id) => {
    if (key === CART_ITEM_SELECTED_KEY) {
      delete mockedStorage[id];
    }
  });
});

afterEach(() => {
  server.resetHandlers();

  mockedStorage = {};
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
});
