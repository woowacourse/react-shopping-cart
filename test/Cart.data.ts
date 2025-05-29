export const cartItems = Object.freeze([
  Object.freeze({
    id: 1,
    quantity: 2,
    isChecked: true,
    product: Object.freeze({
      id: 1,
      name: '상품1',
      price: 10000,
      imageUrl: '/image1.jpg',
      category: '식료품',
      quantity: 10,
    }),
  }),
  Object.freeze({
    id: 2,
    quantity: 1,
    isChecked: true,
    product: Object.freeze({
      id: 2,
      name: '상품2',
      price: 30000,
      imageUrl: '/image2.jpg',
      category: '식료품',
      quantity: 10,
    }),
  }),
]);
