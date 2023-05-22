import { atom, selector } from 'recoil';
import { Cart } from '../types/index';
import { useLocalStorage } from '../components/hooks/useLocalStorage';

const { getLocalStorageData } = useLocalStorage();
const cartList = getLocalStorageData<Cart[]>('cartList');

export const cartState = atom({
  key: 'cartState',
  default: cartList,
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});

const checkedProductList: Cart[] = [];

export const checkedProductState = atom({
  key: 'checkedProductState',
  default: checkedProductList,
});

export const checkedProductPrice = selector({
  key: 'checkedProductPrice',
  get: ({ get }) =>
    get(checkedProductState).reduce((acc, cartProduct) => {
      return acc + cartProduct.product.price * cartProduct.quantity;
    }, 0),
});
