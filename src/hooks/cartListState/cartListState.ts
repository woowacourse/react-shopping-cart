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

import fetchCartItems from '../../utils/fetchCartItem';
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../../constants/cartConstants';

const cartState = atom<CartItem[]>({
  key: 'cartListWithInfoState',
  default: selector({
    key: 'cartListWithInfoState/default',
    get: async () => {
      // Get
      const cartProducts: CartItem[] = await fetchCartItems.get();
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
