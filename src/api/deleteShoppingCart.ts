export default async function deleteShoppingCart(productId: number) {
  const token = import.meta.env.VITE_APP_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseUrl}/cart-items/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('에러 발생');
  }
}
