import { CartProduct } from '../types/cart';
import { apiClient } from './apiClient';

export const getCartItems = async () => {
  try {
    return await apiClient('/cart-items?page=0&size=20');
  } catch (error) {
    throw new Error('장바구니 목록을 불러오는 중 에러 발생');
  }
};

export const patchIncreaseQuantity = async (cartItem: CartProduct) => {
  try {
    return await apiClient(`/cart-items/${cartItem.id}`, {
      method: 'PATCH',
      body: {
        quantity: cartItem.quantity + 1,
      },
    });
  } catch (error) {
    throw new Error('장바구니 상품 증가시 오류 발생');
  }
};

export const patchDecreaseQuantity = async (cartItem: CartProduct) => {
  try {
    return await apiClient(`/cart-items/${cartItem.id}`, {
      method: 'PATCH',
      body: {
        quantity: cartItem.quantity - 1,
      },
    });
  } catch (error) {
    throw new Error('장바구니 상품 감소시 오류 발생');
  }
};

export const removeCartItem = async (cartItem: CartProduct) => {
  try {
    return await apiClient(`/cart-items/${cartItem.id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('장바구니 상품 삭제시 오류 발생');
  }
};
