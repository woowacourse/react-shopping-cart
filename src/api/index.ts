export const fetchProducts = async () => {
  try {
    const response = await fetch("/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCartItems = async () => {
  try {
    const response = await fetch("/cart-items");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
