const cartConverter = (cartList) => {
  return cartList.reduce((prev, cartItem) => {
    const targetIndex = prev.findIndex((product) => product.product_id === cartItem.product_id);
    if (targetIndex === -1) {
      return prev.concat({ ...cartItem, amount: 1, isChecked: true });
    }

    return prev;
  }, []);
};

export { cartConverter };
