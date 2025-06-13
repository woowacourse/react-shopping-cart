export default async function getCoupons() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseUrl}/coupons`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('에러 발생');
  }

  const data = await response.json();

  return data;
}
