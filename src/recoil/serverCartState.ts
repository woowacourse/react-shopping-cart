import { atom, selector } from 'recoil';
import { ServerCartItem } from '../types/Cart';

const serverCartSelector = selector({
  key: 'serverCartSelector',
  get: async (): Promise<ServerCartItem[]> => {
    const data = await fetch('/cart-items', { method: 'GET' });
    return data.json();
  },
});

const serverCartState = atom<ServerCartItem[]>({
  key: 'serverCartState',
  default: serverCartSelector,
});

export default serverCartState;
