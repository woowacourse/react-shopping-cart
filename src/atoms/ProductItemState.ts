import { atomFamily } from 'recoil';
import { getMockData } from '../utils/getMockData';

export const productItemStateFamily = atomFamily({
  key: 'ProductItemState',
  default: (id: number) => {
    const productItem = getMockData.filter((product) => product.id === id)[0];

    return productItem;
  },
});
