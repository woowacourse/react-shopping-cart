const cartConverter = (newCartList, currentCartList) => {
  return newCartList.reduce((prev, cartItem) => {
    const targetIndex = prev.findIndex((product) => product.product_id === cartItem.product_id);
    const currentCartItem = currentCartList.find((product) => product.product_id === cartItem.product_id);
    if (targetIndex === -1) {
      return prev.concat({
        ...cartItem,
        quantity: currentCartItem ? currentCartItem.quantity : 1,
        isChecked: true,
      });
    }

    return prev;
  }, []);
};

const snakeToCamelConverter = (string) => {
  return string.toLowerCase().replace(/([_][a-z|A-Z])/g, (letters) => letters.toUpperCase().replace('_', ''));
};

export { cartConverter, snakeToCamelConverter };
