const getCartItems = async () => {
  const data = await fetch('https://localhost:5273/cart-items');
  const { content } = await data.json();

  return content;
};

export default getCartItems;
