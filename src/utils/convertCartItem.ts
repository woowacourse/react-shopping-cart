const convertCartItemList = (rawCartItemList: RawCartItem[]): CartItem[] => {
  return rawCartItemList.map((rawCartItem) => {
    const result = {
      id: rawCartItem.id,
      quantity: rawCartItem.quantity,
      name: rawCartItem.product.name,
      price: rawCartItem.product.price,
      imageUrl: rawCartItem.product.imageUrl,
    };

    return result;
  });
};

export default convertCartItemList;
