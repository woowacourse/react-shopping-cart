export const CART_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;

export async function getCartItem() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };

  const params = new URLSearchParams({
    page: '0',
    size: '50',
  });

  const res = await fetch(`${CART_URL}?${params.toString()}`, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `장바구니 불러오기 실패 (status: ${res.status})`);
  }

  return res.json();
}

export async function deleteCartItem(id: number) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };

  const res = await fetch(`${CART_URL}/${id}`, options);

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(errorText || `장바구니 항목 삭제 실패 (status: ${res.status})`);
  }

  return res;
}

export async function patchCartItem({ id, quantity }: { id: number; quantity: number }) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
    body: JSON.stringify({ quantity }),
  };

  const res = await fetch(`${CART_URL}/${id}`, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `수량 변경 실패 (status: ${res.status})`);
  }

  return res;
}
