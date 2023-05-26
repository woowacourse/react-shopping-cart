const getResponseBody = async (response: Response) => {
  if (!response.ok) throw new Error();
  const data = await response.json();
  return data;
};

export const productsQuery = async () => {
  const response = await fetch('/products');
  return getResponseBody(response);
};

export const cartQuery = async () => {
  const response = await fetch('/cart-items');
  return getResponseBody(response);
};

export const productQuery = async (id: number) => {
  const response = await fetch(`/product/${id}`);
  return getResponseBody(response);
};

export const postCartItemQuery = async (id: number) => {
  const response = await fetch('/cart-items', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: id }),
  });
  if (!response.ok) throw new Error();
  const header = response.headers;
  const cartId = header.get('Location');
  if (!cartId) throw new Error();

  return +cartId.replace('/cart-items/', '');
};

export const patchCartItemQuantityQuery = async (
  id: number,
  quantity: number
) => {
  const response = await fetch(`/cart-items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error();
};

export const deleteItemQuery = async (cartId: number) => {
  const response = await fetch(`/cart-items/${cartId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error();
};
