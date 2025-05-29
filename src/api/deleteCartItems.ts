const deleteCartItems = async (id: number) => {
  const response = await fetch(`https://localhost:5273/cart-items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return response.json();
};

export default deleteCartItems;
