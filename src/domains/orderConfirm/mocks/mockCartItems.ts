import { CartItemTypes } from "../../shopping-cart/types/cartItem";

export const mockSelectedCartItems: CartItemTypes[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 101,
      name: "상품A",
      imageUrl: "https://example.com/a.jpg",
      price: 5000,
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 102,
      name: "상품B",
      imageUrl: "https://example.com/b.jpg",
      price: 12000,
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 103,
      name: "상품C",
      imageUrl: "https://example.com/c.jpg",
      price: 8000,
    },
  },
];
