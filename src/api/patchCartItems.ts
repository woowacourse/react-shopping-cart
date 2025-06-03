const patchCartItems = async (id: number, quantity: number) => {
  const response = await fetch(`https://localhost:5273/cart-items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return response.json();
};

export default patchCartItems;
