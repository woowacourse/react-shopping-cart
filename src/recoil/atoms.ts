import { atom } from 'recoil';
import { ProductItem } from '../types/ProductType';
import mockData from '../assets/mockData.json';

const productListState = atom<ProductItem[]>({
  key: 'productListState',
  default: mockData as ProductItem[],
});

export default productListState;
