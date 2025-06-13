import { CartItem } from "../../src/types/type";

export const createMockCartItem = (
  id: number,
  name: string,
  price: number,
  category: "식료품" | "패션잡화" = "식료품",
  quantity: number = 1
): CartItem => ({
  id,
  product: {
    id: id + 100,
    name,
    price,
    category,
    imageUrl: `https://example.com/${name.toLowerCase()}.jpg`,
  },
  quantity,
  isSelected: true,
});

export const defaultMockCartItems = [
  createMockCartItem(1, "콜라", 1500, "식료품", 2),
  createMockCartItem(2, "사이다", 1500, "식료품", 1),
];
