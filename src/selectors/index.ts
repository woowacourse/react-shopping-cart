import { selector } from 'recoil';

export const productListQuery = selector({
  key: 'ProductList',
  get: async () => {
    const mockData = await fetch('./mockData.json').then((response) =>
      response.json(),
    );

    return mockData.products;
  },
});
