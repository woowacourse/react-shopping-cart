import { CartItemId, RawCartItem } from "../../types/cartItems";

export const MOCK_RAW_CART_ITEMS: RawCartItem[] = [
  {
    id: 1,
    quantity: 2,
    product: {
      id: 101,
      name: "Product 1",
      price: 10_000,
      imageUrl: "https://example.com/product1.jpg",
      category: "Category 1",
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 102,
      name: "Product 2",
      price: 20_000,
      imageUrl: "https://example.com/product2.jpg",
      category: "Category 2",
    },
  },
  {
    id: 3,
    quantity: 3,
    product: {
      id: 103,
      name: "Product 3",
      price: 15_000,
      imageUrl: "https://example.com/product3.jpg",
      category: "Category 3",
    },
  },
];

export const MOCK_SELECTED_CART_ITEM_IDS: CartItemId[] = [1, 3];

export const EXPECTED_CART_AMOUNT = {
  orderAmount: 65_000,
  shippingCost: 3_000,
  totalOrderAmount: 68_000,
};
