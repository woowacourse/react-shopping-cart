import { atom } from 'recoil';
import { Product } from '../../types/Product';

export const productItemsState = atom<Product[]>({
  key: 'productItemsState',
  default: [],
  effects: [
    ({ setSelf, trigger }) => {
      const getProductItems = () => {
        const productItems = fetch('/products').then((response) =>
          response.json()
        );

        setSelf(productItems);
      };

      if (trigger === 'get') getProductItems();
    },
  ],
});
