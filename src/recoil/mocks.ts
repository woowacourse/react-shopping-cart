import { CartItem, DiscountCondition } from "../types/types";

export const mockCartItems: CartItem[] = [
  { id: 1, product: { id: 3, name: "상품이름A", price: 35000, imageUrl: "", category: "" }, quantity: 2 },
  { id: 2, product: { id: 4, name: "상품이름B", price: 25000, imageUrl: "", category: "" }, quantity: 3 },
  { id: 3, product: { id: 5, name: "상품이름C", price: 20000, imageUrl: "", category: "" }, quantity: 1 },
];

export const mockCouponList: DiscountCondition[] = [
  {
    id: 0,
    code: "string",
    description: "string",
    expirationDate: "2024-05-23",
    discount: 0,
    minimumAmount: 0,
    discountType: "string",
  },
  {
    id: 0,
    code: "string",
    description: "string",
    expirationDate: "2024-05-23",
    buyQuantity: 0,
    getQuantity: 0,
    discountType: "string",
  },
  {
    id: 0,
    code: "string",
    description: "string",
    expirationDate: "2024-05-23",
    minimumAmount: 0,
    discountType: "string",
  },
];

export const mockCheckedIds: number[] = [1, 2];
