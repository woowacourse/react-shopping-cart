export const addToCart = async (productId: number) => {
  const response = await fetch('/cart-items', {
    method: 'POST',
    body: JSON.stringify({
      productId,
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const updateCartItem = async (id: number, count: number) => {
  const response = await fetch(`/cart-items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      quantity: count,
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const deleteCartItem = async (id: number) => {
  const response = await fetch(`/cart-items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
