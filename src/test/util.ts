export const makeCartItem = (id: number, price: number, quantity: number) => {
  return {
    id: 1234,
    quantity,
    product: {
      id,
      name: `${price}원 음료`,
      price,
      imageUrl:
        "https://godomall.speedycdn.net/1cd80571a779bf8f2c08a18dc0965949/goods/1000000027/image/detail/1000000027_detail_012.jpg",
      category: "beverage",
    },
  };
};
