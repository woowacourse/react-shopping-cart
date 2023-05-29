import { atom } from 'recoil';
import { client } from '../../api';
import type { Product } from '../../type';

const productsState = atom<Product[]>({
  key: 'productsState',
  default: client
    .get('/products')
    .acceptOrThrow(200)
    .then((response) => response.data),
});

export default productsState;
