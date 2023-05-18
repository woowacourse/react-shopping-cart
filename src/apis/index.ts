export const fetchGetAPI = async (path: string) => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error('');
    }

    const result = await response.json();

    return result;
  } catch (error) {}
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
  const url = `/cart-items/${cartItemId}`;
  const credentials = '';

  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('');
    }

    const result = await response.json();

    return result;
  } catch (error) {}
};
