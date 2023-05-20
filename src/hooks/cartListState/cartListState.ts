import {
  DefaultValue,
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import type { CartItem, ProductItem } from '../../types/ProductType';
import { productListState } from '../productListState/productListState';

const cartListState = atom<CartItem[]>({
  key: 'cartListWithInfoState',
  default: selector({
    key: 'cartListWithInfoState/default',
    get: async () => {
      const response = await fetch('/cart-items');
      const cartProducts: CartItem[] = await response.json();
      return cartProducts.map((cartProduct) => {
        cartProduct.checked = true;
        return cartProduct;
      });
    },
  }),
});

const cartItemQuantityState = selectorFamily<number, number>({
  key: 'cartItemQuantityState',
  get:
    (id) =>
    ({ get }) => {
      const cartList = get(cartListState);
      const cartProduct = cartList.filter((cartItem) => cartItem.id === id)[0];

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
          if (quantity === 0) return;
          const product = get(productListState).filter((product) => product.id === id)[0];

          set(cartListState, (prevCartList) => [
            ...prevCartList,
            {
              id,
              quantity,
              product,
            },
          ]);

          fetch('/cart-items', {
            method: 'POST',
            body: JSON.stringify({
              productId: product.id,
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

export const useProductListInCart: () => ProductItem[] = () => {
  const cartListWithInfo = useRecoilValue(cartListState);

  return cartListWithInfo.map(({ product }) => {
    const productInfo: ProductItem = { ...product };
    return productInfo;
  });
};

export const useCartItemList = () => useRecoilState(cartListState);
export const useCartItemQuantityById = (id: number) => useRecoilState(cartItemQuantityState(id));
export const useCartListLength = () => useRecoilValue(cartListState).length;
