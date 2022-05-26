const checkedQuantityPrice = (checkedItems) =>
  checkedItems.reduce(
    (prev, cur) => {
      return {
        totalQuantity: cur.quantity + prev.totalQuantity,
        totalPrice: cur.price * cur.quantity + prev.totalPrice,
      };
    },
    {totalQuantity: 0, totalPrice: 0},
  );

export {checkedQuantityPrice};
