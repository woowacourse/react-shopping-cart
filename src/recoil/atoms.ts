import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LOCAL_STORAGE_KEY } from '../constants';

interface ProductInCart {
  id: number;
  quantity: number;
}

const { persistAtom } = recoilPersist({
  key: LOCAL_STORAGE_KEY.CART,
});

export const productsInCartState = atom<ProductInCart[]>({
  key: 'productsInCart',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
