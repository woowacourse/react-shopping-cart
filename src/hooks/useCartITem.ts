    if (!isInCart()) setCartList((current) => [...current, { id, quantity: 1 }]);
    setCartList((current) => current.filter((item) => item.id !== id));
  const changeCartItemQuantity = (quantity: number) => {
    quantity,
    changeCartItemQuantity,
