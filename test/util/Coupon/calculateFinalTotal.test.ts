import { calculateFinalTotal } from "@/util/coupon/calculateFinalTotal";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";

const mockCartItems: CartItem[] = [
  {
    id: "1",
    product: {
      id: "1",
      name: "상품1",
      price: 10000,
      imageUrl: "",
      category: "test",
      quantity: 10,
    },
    quantity: 2,
  },
  {
    id: "2",
    product: {
      id: "2",
      name: "상품2",
      price: 20000,
      imageUrl: "",
      category: "test",
      quantity: 10,
    },
    quantity: 1,
  },
];

const fixedCoupon: Coupon = {
  id: "1",
  code: "FIXED5000",
  description: "5000원 할인",
  expirationDate: new Date("2024-12-31"),
  discountType: "fixed",
  discount: 5000,
};

const percentageCoupon: Coupon = {
  id: "2",
  code: "PERCENT10",
  description: "10% 할인",
  expirationDate: new Date("2024-12-31"),
  discountType: "percentage",
  discount: 10,
};

describe("calculateFinalTotal", () => {
  it("쿠폰 없이 주문 총액과 배송비를 올바르게 계산한다", () => {
    const result = calculateFinalTotal([], mockCartItems, false);

    expect(result.orderTotal).toBe(40000); // 10000*2 + 20000*1
    expect(result.shippingFee).toBe(3000); // 기본 배송비
    expect(result.discountTotal).toBe(0);
    expect(result.finalTotal).toBe(43000); // 40000 + 3000
  });

  it("고정 할인 쿠폰이 적용된다", () => {
    const result = calculateFinalTotal([fixedCoupon], mockCartItems, false);

    expect(result.orderTotal).toBe(40000);
    expect(result.discountTotal).toBe(5000);
    expect(result.finalTotal).toBe(38000); // 40000 + 3000 - 5000
  });

  it("퍼센트 할인 쿠폰이 적용된다", () => {
    const result = calculateFinalTotal(
      [percentageCoupon],
      mockCartItems,
      false
    );

    expect(result.orderTotal).toBe(40000);
    expect(result.discountTotal).toBe(4000); // 40000 * 0.1
    expect(result.finalTotal).toBe(39000); // 40000 + 3000 - 4000
  });

  it("여러 쿠폰이 동시에 적용된다", () => {
    const result = calculateFinalTotal(
      [fixedCoupon, percentageCoupon],
      mockCartItems,
      false
    );

    expect(result.orderTotal).toBe(40000);
    expect(result.discountTotal).toBe(9000); // 5000 + 4000
    expect(result.finalTotal).toBe(34000); // 40000 + 3000 - 9000
  });
});
