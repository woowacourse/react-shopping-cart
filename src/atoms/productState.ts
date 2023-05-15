import { selector } from 'recoil';

export const products = selector({
  key: 'products',
  get: async () => {
    const response = await fetch('/products');
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  },
});
