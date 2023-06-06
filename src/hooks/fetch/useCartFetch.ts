export const useCartFetch = () => {
  const addCartItemById = (id: number) => {
    fetch('/cart-items', {
      method: 'POST',
      body: JSON.stringify({ productId: id }),
    });
  };

  const deleteCartItemById = (id: number) => {
    return fetch(`/cart-items/${id}`, {
      method: 'DELETE',
    });
  };

  const patchCartItemQuantity = (id: number, quantity: number) => {
    return fetch(`/cart-items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  };

  const getCartItems = async () => {
    const response = await fetch('/cart-items');
    const cartItems = await response.json();

    return cartItems;
  };

  return {
    addCartItemById,
    deleteCartItemById,
    patchCartItemQuantity,
    getCartItems,
  };
};
