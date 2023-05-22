import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import type { CartItemType, ProductItemType } from '../../types/ProductType';
import fetchCartItems from '../../utils/fetchCartItem';
import { useCallback, useMemo } from 'react';

const cartState = atom<CartItemType[]>({
  key: 'cartListWithInfoState',
  default: selector({
    key: 'cartListWithInfoState/default',
    get: async () => {
      const cartProducts: CartItemType[] = await fetchCartItems.get();
      return cartProducts.map((cartProduct) => {
        cartProduct.checked = true;
        return cartProduct;
      });
    },
  }),
});

export default cartState;

export const useProductListInCart: () => ProductItemType[] = () => {
  const cart = useRecoilValue(cartState);

  return cart.map(({ product }) => {
    const productInfo: ProductItemType = { ...product };
    return productInfo;
  });
};

export const useCartItemList = () => useRecoilState(cartState);

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
