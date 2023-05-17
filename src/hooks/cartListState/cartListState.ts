import { DefaultValue, atom, selector, selectorFamily, useRecoilState } from 'recoil';
import { CartItem, CartItemWithProduct } from '../../types/ProductType';

const cartListState = atom<CartItem[]>({
  key: 'cartListState',
  default: selector({
    key: 'cartListState/default',
    get: async () => {
      const response = await fetch('/cart-items');
      const cartProducts: CartItemWithProduct[] = await response.json();
      const cartItems: CartItem[] = cartProducts.map((productInCart) => ({
        id: productInCart.id,
        quantity: productInCart.quantity,
      }));

      return cartItems;
    },
  }),
});

const cartItemState = selectorFamily<number, number>({
  key: 'cartItemState',
  get:
    (id) =>
    ({ get }) => {
      const cartList = get(cartListState);
      const cartProduct = cartList.filter((cartProduct) => cartProduct.id === id)[0];
      return cartProduct?.quantity ?? 0;
    },
  set:
    (id) =>
    ({ get, set }, quantity) => {
      // TODO: 분리하기
      if (!(quantity instanceof DefaultValue) && quantity < 99 && quantity >= 0) {
        const cartList = get(cartListState);

        // TODO: post
        if (!cartList.some((item) => item.id === id)) {
          set(cartListState, (prevCartList) => [
            ...prevCartList,
            {
              id,
              quantity: 1,
            },
          ]);

          fetch('/cart-items', {
            method: 'POST',
            body: JSON.stringify({
              productId: id,
            }),
          });

          return;
        }

        // TODO: delete
        if (quantity === 0) {
          set(cartListState, (prevCartList) => prevCartList.filter((item) => item.id !== id));

          fetch(`/cart-items/${id}`, {
            method: 'DELETE',
          });

          return;
        }

        // TODO: patch
        set(cartListState, (prevCartList) => {
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

        fetch(`/cart-items/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            quantity,
          }),
        });
      }
    },
});

export const useCartItemById = (id: number) => useRecoilState(cartItemState(id));
