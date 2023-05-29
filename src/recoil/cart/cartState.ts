import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import type { CartItemType, ProductItemType } from '../../types/ProductType';
import fetchCartItems from '../../utils/fetchCartItem';
import { useCallback } from 'react';
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../../views/CarItem/constants/cartConstants';

export const CartItemQuery = selector({
  key: 'cartListWithInfoState/default',
  get: async () => {
    const cartProducts: CartItemType[] = await fetchCartItems.get();
    return cartProducts.map((cartProduct) => {
      cartProduct.checked = true;
      return cartProduct;
    });
  },
});

const cartState = atom<CartItemType[]>({
  key: 'cartListWithInfoState',
  default: CartItemQuery,
});

export default cartState;

export const useProductListInCart: () => ProductItemType[] = () => {
  const cart = useRecoilValue(cartState);

  return cart.map(({ product }) => {
    const productInfo: ProductItemType = { ...product };
    return productInfo;
  });
};

export const useRefreshCartList = () => useRecoilRefresher_UNSTABLE(cartState);

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  // quantity
  const getCartItemQuantity = (id: number) => {
    const cartItem = cart.find((cartItem) => cartItem.id === id);

    return cartItem?.quantity ?? 0;
  };

  const addCartItem = async (productId: number) => {
    await fetchCartItems.add(productId);
    setCart(await fetchCartItems.get());
  };

  const setCartItemQuantity = (id: number, quantity: number) => {
    if (!(quantity < MAX_CART_QUANTITY) || !(quantity >= MIN_CART_QUANTITY)) return;

    //Delete
    if (quantity === 0) {
      setCart((prevCartList) => prevCartList.filter((item) => item.id !== id));

      fetchCartItems.delete(id);
      return;
    }

    // Patch
    setCart((prevCartList) => {
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
  };

  // Check
  const getCartItemCheck = (id: number) => {
    const cartItem = cart.find((cartItem) => cartItem.id === id);

    return cartItem?.checked ?? false;
  };

  const setCartItemCheck = (id: number, checked: boolean) => {
    setCart((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem.id === id) {
          return {
            ...cartItem,
            checked,
          };
        }

        return cartItem;
      });
    });
  };

  const isAllChecked = cart.every((cartItem) => cartItem.checked);

  const checkedCount = cart.reduce((totalCount, cartItem) => {
    return cartItem.checked ? totalCount + 1 : totalCount;
  }, 0);

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
        fetchCartItems.delete(item.id);
      });
  };

  return {
    cart,
    setCart,
    addCartItem,
    getCartItemQuantity,
    setCartItemQuantity,

    getCartItemCheck,
    setCartItemCheck,
    isAllChecked,
    checkedCount,
    toggleAllCartItem,
    deleteCheckedItems,
  };
};
