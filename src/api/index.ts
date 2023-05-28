export const getRequest = async <T>(path: string) => {
  console.log(`/api/${path}`);
  const response = await fetch(`/api/${path}`);

  if (response.status >= 400) {
    throw new Error('상품 정보를 가져오는데 실패했습니다.');
  }

  const data: T = await response.json();

  return data;
};

export const postCartItem = async (productId: number) => {
  const response = await fetch('/api/carts', {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({
      productId,
    }),
  });

  if (response.status >= 400) {
    throw new Error('장바구니에 물품을 담는데 실패했습니다.');
  }
};

export const patchCartItemQuantity = async (
  productId: number,
  quantity: number
) => {
  const response = await fetch(`/cart-items/${productId}`, {
    method: 'PATCH',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (response.status >= 400) {
    throw new Error('해당 상품의 수량을 수정할 수 없습니다.');
  }
};

export const deleteCartItem = async (productId: number) => {
  const response = await fetch(`/cart-items/${productId}`, {
    method: 'DELETE',
  });

  if (response.status >= 400) {
    throw new Error('장바구니에 없는 품목을 삭제할 수 없습니다.');
  }
};
