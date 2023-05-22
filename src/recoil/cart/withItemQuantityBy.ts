import { DefaultValue, selectorFamily, useRecoilState } from 'recoil';
import cartState from './cartState';
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../../views/CarItem/constants/cartConstants';

import fetchCartItems from '../../utils/fetchCartItem';
import { productListState } from '../product/productListState';

const withItemQuantityBy = selectorFamily<number, number>({
  key: 'cartItemQuantityState',
  get:
    (id) =>
    ({ get }) => {
      const cart = get(cartState);
      const cartItem = cart.filter((cartItem) => cartItem.id === id)[0];

      return cartItem?.quantity ?? 0;
    },
  set:
    (id) =>
    ({ get, set }, quantity) => {
      if (
        !(quantity instanceof DefaultValue) &&
        quantity < MAX_CART_QUANTITY &&
        quantity >= MIN_CART_QUANTITY
      ) {
        const cartList = get(cartState);

        // Post
        if (!cartList.some((item) => item.id === id)) {
          if (quantity === 0) return;
          const product = get(productListState).filter((product) => product.id === id)[0];

          set(cartState, (prevCartList) => [
            ...prevCartList,
            {
              id,
              quantity,
              checked: true,
              product,
            },
          ]);

          fetchCartItems.add(id);
          return;
        }

        //Delete
        if (quantity === 0) {
          set(cartState, (prevCartList) => prevCartList.filter((item) => item.id !== id));

          fetchCartItems.delete(id);
          return;
        }

        // Patch
        set(cartState, (prevCartList) => {
          return prevCartList.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity,
              };
            } else {
              return item;
            }
          });
        });

        fetchCartItems.update(id, quantity);
        return;
      }
    },
});

export default withItemQuantityBy;

export const useCartItemQuantityBy = (id: number) => useRecoilState(withItemQuantityBy(id));
