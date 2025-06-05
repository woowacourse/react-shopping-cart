const getCartItems = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart-items`);
  const { content } = await response.json();

  if (!response.ok) {
    throw new Error('Failed to delete cart item');
  }

  return content;
};

export default getCartItems;
