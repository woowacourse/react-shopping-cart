export default async function patchShoppingCart(
  productId: number,
  quantity: number
) {
  const token = import.meta.env.VITE_APP_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseUrl}/cart-items/${productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: productId,
      quantity,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(
      errorBody.message ?? '장바구니 수량 수정 중 오류가 발생했습니다.'
    );
  }
}
