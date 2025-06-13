export const COUPON_URL = `${import.meta.env.VITE_BASE_URL}/coupons`;

export async function getCoupon() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };
  const res = await fetch(`${COUPON_URL}`, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `쿠폰 불러오기 실패 (status: ${res.status})`);
  }

  return res.json();
}
