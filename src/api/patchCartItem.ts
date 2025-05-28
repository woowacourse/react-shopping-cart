import { URLS } from '../constants/url';

const patchCartItem = async (cartItemId: number | undefined, quantity: number) => {
  if (cartItemId === undefined) {
    throw new Error('cartItemId가 정의되지 않았습니다.');
  }
  const result = await fetch(`${URLS.CART_ITEMS}/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Basic ${btoa(`${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quantity
    })
  });

  if (!result.ok) {
    throw new Error('장바구니에서 상품 수량을 수정하는데 실패했습니다');
  }
};

export default patchCartItem;
