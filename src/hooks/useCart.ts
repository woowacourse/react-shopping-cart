import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cartListState } from '../recoil/atoms';
import { CartItemInfo, ProductInfo } from '../types';
import { CART_BASE_URL } from '../constants';
import { useSetFetchedData } from './useSetFetchedData';

export const useCart = (productInfo?: ProductInfo) => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const { api } = useSetFetchedData<CartItemInfo[]>(CART_BASE_URL, setCartList);

  const setDefaultCartList = () => {
    api.get(CART_BASE_URL);
  };

  const getCartItem = () => {
    return cartList.find((cartItem) => cartItem.id === productInfo?.id);
  };

  const addToCart = () => {
    if (!productInfo) return;
    api.post(CART_BASE_URL, { productId: productInfo.id }, CART_BASE_URL);
  };

  const updateProductQuantity = (quantity: number) => {
    if (!productInfo) return;
    if (quantity <= 0) {
      deleteFromCart();
      return;
    }

    api.patch(`${CART_BASE_URL}/${productInfo.id}`, { quantity: quantity }, CART_BASE_URL);
  };

  const deleteFromCart = (productId?: number) => {
    const curProductId = productId ? productId : productInfo?.id;
    api.delete(`${CART_BASE_URL}/${curProductId}`, CART_BASE_URL);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDefaultCartList(), []);

  return {
    cartList,
    setCartList,
    setDefaultCartList,
    getCartItem,
    addToCart,
    deleteFromCart,
    updateProductQuantity,
  };
};
