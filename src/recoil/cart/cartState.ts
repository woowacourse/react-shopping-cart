import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import type { CartItemType, ProductItemType } from '../../types/ProductType';
import fetchCartItems from '../../utils/fetchCartItem';
import { useCallback, useMemo } from 'react';

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
        fetchCartItems.delete(item.id);
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
