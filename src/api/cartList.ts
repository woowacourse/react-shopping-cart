export const fetchCartList = async <T>(): Promise<T> => {
  const response = await fetch('/cart-items');
  const data = await response.json();

  return data;
};

export const postCartItem = async <T>(id: number): Promise<T> => {
  const response = await fetch(`/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();

  return data;
};

export const fetchCartItem = async <T>(id: number): Promise<T> => {
  const response = await fetch(`/cart-items/${id}`);
  const data = await response.json();

  return data;
};

export const updateCartItem = async <T>(
  id: number,
  quantity: number
): Promise<T> => {
  const response = await fetch(`/cart-items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();

  return data;
};

export const deleteCartItem = async <T>(id: number): Promise<T> => {
  const response = await fetch(`/cart-items/${id}`, { method: 'DELETE' });
  const data = await response.json();

  return data;
};
