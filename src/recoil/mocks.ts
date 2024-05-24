import { CartItem } from "../types/types";
import { Coupon } from "../types/Coupon";

export const mockCartItems: CartItem[] = [
  { id: 1, product: { id: 3, name: "상품이름A", price: 35000, imageUrl: "", category: "" }, quantity: 2 },
  { id: 2, product: { id: 4, name: "상품이름B", price: 25000, imageUrl: "", category: "" }, quantity: 3 },
  { id: 3, product: { id: 5, name: "상품이름C", price: 20000, imageUrl: "", category: "" }, quantity: 1 },
];

export const mockCouponList: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-11-30", // 유효기한 조건
    discount: 5000,
    minimumAmount: 100000, // 최소구매금액 조건
    discountType: "fixed", // :할인 방식
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2024-04-30", // 유효기한 조건
    buyQuantity: 2, // 동일상품 구매개수 조건
    getQuantity: 1,
    discountType: "buyXgetY", // :할인 방식
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2024-08-31", // 유효기한 조건
    minimumAmount: 50000, // 최소 구매금액 조건
    discountType: "freeShipping", // : 할인 방식
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2024-07-31", // 유효기한 조건
    discount: 30,
    availableTime: {
      // 적용 가능 시간 조건
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage", // : 할인 방식
  },
];
export const mockCheckedIds: number[] = [1, 2];
