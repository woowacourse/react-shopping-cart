export const productsQuery = async () => {
  const response = await fetch('/products');
  if (!response.ok) throw new Error();
  const data = await response.json();
  return data;
};

export const cartQuery = async () => {
  const response = await fetch('/cart-items');
  if (!response.ok) throw new Error();
  const data = await response.json();
  return data;
};

export const productQuery = async (id: number) => {
  const response = await fetch(`/product/${id}`);
  if (!response.ok) throw new Error();
  const data = await response.json();
  return data;
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
  console.log(id, quantity);
  const response = await fetch(`/cart-items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
  console.log(response);
  if (!response.ok) throw new Error();
};
