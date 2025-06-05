const getCartItems = async () => {
  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/cart-items`);
  const { content } = await data.json();

  return content;
};

export default getCartItems;
