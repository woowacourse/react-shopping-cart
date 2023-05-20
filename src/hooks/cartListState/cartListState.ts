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
import { useCallback, useMemo } from 'react';

const cartState = atom<CartItem[]>({
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
      const cart = get(cartState);
      const cartItem = cart.filter((cartItem) => cartItem.id === id)[0];

      return cartItem?.quantity ?? 0;
    },
  set:
    (id) =>
    ({ get, set }, quantity) => {
      // TODO: 분리하기
      if (!(quantity instanceof DefaultValue) && quantity < 99 && quantity >= 0) {
        const cartList = get(cartState);

        // TODO: post
        if (!cartList.some((item) => item.id === id)) {
          if (quantity === 0) return;
          const product = get(productListState).filter((product) => product.id === id)[0];

          set(cartState, (prevCartList) => [
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
          set(cartState, (prevCartList) => prevCartList.filter((item) => item.id !== id));

          fetch(`/cart-items/${id}`, {
            method: 'DELETE',
          });

          return;
        }

        // TODO: patch
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

        fetch(`/cart-items/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            quantity,
          }),
        });
      }
    },
});

const cartItemCheckedState = selectorFamily<boolean, number>({
  key: 'cartItemCheckedState',
  get:
    (id) =>
    ({ get }) => {
      const cart = get(cartState);
      const cartItem = cart.filter((cartItem) => cartItem.id === id)[0];

      return cartItem?.checked ?? false;
    },

  set:
    (id) =>
    ({ set }, checked) => {
      if (!(checked instanceof DefaultValue)) {
        set(cartState, (prevCartList) => {
          return prevCartList.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                checked,
              };
            } else {
              return item;
            }
          });
        });
      }
    },
});

const cartTotalCheckedCount = selector({
  key: 'cartCountChecked',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((acc, cur) => {
      if (cur.checked) return acc + 1;
      return acc;
    }, 0);
  },
});

const cartTotalPriceState = selector({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((acc: number, item) => {
      if (!item.checked) return acc;

      return acc + item.product.price * item.quantity;
    }, 0);
  },
});

export const useProductListInCart: () => ProductItem[] = () => {
  const cart = useRecoilValue(cartState);

  return cart.map(({ product }) => {
    const productInfo: ProductItem = { ...product };
    return productInfo;
  });
};

export const useCartItemList = () => useRecoilState(cartState);
export const useCartItemQuantityById = (id: number) => useRecoilState(cartItemQuantityState(id));
export const useCartItemCheckedById = (id: number) => {
  const [isChecked, setIsChecked] = useRecoilState(cartItemCheckedState(id));
  return {
    isChecked,
    toggleCheck: () => {
      setIsChecked(!isChecked);
    },
  };
};
export const useCartTotalCheckedCountReadOnly = () => {
  return { totalCheckedCountReadLOnly: useRecoilValue(cartTotalCheckedCount) };
};
export const useCartTotalPriceReadOnly = () => {
  return { totalPriceReadOnly: useRecoilValue(cartTotalPriceState) };
};

export const useCheckCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const toggleMap = useMemo<{ [id: number]: boolean }>(() => {
    return cart.reduce((acc, { product, checked }) => {
      const { id } = product;
      Object.assign(acc, { [id]: checked });
      return acc;
    }, {});
  }, [cart]);

  const isAllChecked = cart.every((cartItem) => cartItem.checked);

  const checkedCount = Object.values(toggleMap).reduce((acc, cur) => {
    if (cur) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const isCheckedById = useCallback((id: number) => toggleMap[id], [toggleMap]);

  const toggleAllCartItem = useCallback(() => {
    setCart((prevCart) => {
      return prevCart.map((item) => ({ ...item, checked: !isAllChecked }));
    });
  }, [isAllChecked, setCart]);

  const deleteCheckedItems = () => {
    setCart(cart.filter((item) => item.checked === false));

    cart
      .filter((item) => item.checked === true)
      .forEach((item) => {
        fetch(`/cart-items/${item.id}`, {
          method: 'DELETE',
        });
      });
  };

  return {
    isAllChecked,
    checkedCount,
    isCheckedById,
    toggleAllCartItem,
    deleteCheckedItems,
  };
};

export const useCartLength = () => useRecoilValue(cartState).length;
