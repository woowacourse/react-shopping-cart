export const fetchProducts = async () => {
  try {
    const response = await fetch("/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
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

export const changeQuantity = async (
  cartItemId: number,
  newQuantity: number
) => {
  try {
    await fetch(`/cart-items/${cartItemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity: newQuantity }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCartItem = async (productId: number) => {
  try {
    await fetch("/cart-items", {
      method: "POST",
      body: JSON.stringify({ productId: productId }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    await fetch(`/cart-items/${cartItemId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};
