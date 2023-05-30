import type { CartItem, Product } from '../types/product';

export const fetchCartItems = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('장바구니 목록을 불러올 수 없습니다.');
  }

  const cartItems = await response.json();

  return cartItems;
};

export const addCartItem = async (url: string, productId: Product['id']) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productId),
  });

  if (!response.ok) {
    throw new Error('장바구니 추가에 실패했습니다.');
  }
};

export const updateQuantity = async (
  url: string,
  quantity: CartItem['quantity'],
) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quantity),
  });

  if (!response.ok) {
    throw new Error('수량 업데이트에 실패했습니다.');
  }
};

export const removeCartItem = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('장바구니에서 삭제하는 데 실패했습니다.');
  }
};
