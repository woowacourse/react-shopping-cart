import { CartItemWithSelection } from "../../cart/types/response";
import { Coupon } from "../types/response";
import { calculateDiscountSequence } from "../calculations/combined/calculateDiscountSequence";
import { calculateCouponDiscount } from "../calculations/combined/calculateCouponDiscount";

jest.mock("../calculations/combined/calculateCouponDiscount");

describe("calculateDiscountSequence 함수 테스트", () => {
  const orderPrice = 100000;
  const shippingFee = 3000;

  const mockItems: CartItemWithSelection[] = [
    {
      id: 101,
      quantity: 3,
      selected: true,
      product: {
        id: 1,
        name: "유기농 바나나",
        price: 10000,
        imageUrl: "https://banana.jpg",
        category: "식료품",
        stock: 10,
      },
    },
    {
      id: 102,
      quantity: 2,
      selected: true,
      product: {
        id: 2,
        name: "신선한 사과 1kg",
        price: 15000,
        imageUrl: "https://apple.jpg",
        category: "식료품",
        stock: 8,
      },
    },
  ];

  const fixedCoupon: Coupon = {
    id: 1,
    code: "FIXED10000",
    description: "10,000원 할인 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "fixed",
    discount: 10000,
  };

  const percentCoupon: Coupon = {
    id: 2,
    code: "PERCENT20",
    description: "20% 할인 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "percentage",
    discount: 20,
  };

  const shippingCoupon: Coupon = {
    id: 3,
    code: "FREESHIP",
    description: "무료 배송 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "freeShipping",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("두 개의 쿠폰 할인을 순차적으로 적용한다", () => {
    (calculateCouponDiscount as jest.Mock)
      .mockReturnValueOnce(10000) // 첫 번째 호출에서 10000원 할인
      .mockReturnValueOnce(18000); // 두 번째 호출에서 18000원 할인 (90000원의 20%)

    const totalDiscount = calculateDiscountSequence(
      [fixedCoupon, percentCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    // fixed 쿠폰 적용
    expect(calculateCouponDiscount).toHaveBeenNthCalledWith(
      1,
      fixedCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    // percentage 쿠폰 적용
    expect(calculateCouponDiscount).toHaveBeenNthCalledWith(
      2,
      percentCoupon,
      mockItems,
      90000, // 100000 - 10000
      shippingFee
    );

    expect(totalDiscount).toBe(28000); // 10000 + 18000
  });

  it("첫 번째 쿠폰이 무료배송인 경우 두 번째 쿠폰 계산 시 배송비는 0으로 전달된다", () => {
    (calculateCouponDiscount as jest.Mock)
      .mockReturnValueOnce(3000) // 첫 번째 호출에서 3000원(배송비) 할인
      .mockReturnValueOnce(20000); // 두 번째 호출에서 20000원 할인

    const totalDiscount = calculateDiscountSequence(
      [shippingCoupon, percentCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    // shippping 쿠폰 적용
    expect(calculateCouponDiscount).toHaveBeenNthCalledWith(
      1,
      shippingCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    // percentage 쿠폰 적용
    expect(calculateCouponDiscount).toHaveBeenNthCalledWith(
      2,
      percentCoupon,
      mockItems,
      97000, // 100000 - 3000
      0 // 배송비가 이미 할인되었으므로 0
    );

    expect(totalDiscount).toBe(23000); // 3000 + 20000
  });

  it("첫 번째 쿠폰 할인이 주문 금액보다 큰 경우 두 번째 쿠폰은 0원을 추가 할인한다", () => {
    const hugeCoupon: Coupon = {
      id: 4,
      code: "HUGE150000",
      description: "15만원 할인 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "fixed",
      discount: 150000,
    };

    (calculateCouponDiscount as jest.Mock)
      .mockReturnValueOnce(100000) // 첫 번째 호출에서 주문 금액 전체 할인
      .mockReturnValueOnce(0); // 두 번째 호출에서 0원 할인

    const totalDiscount = calculateDiscountSequence(
      [hugeCoupon, percentCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    // hugeCoupon 쿠폰 적용
    expect(calculateCouponDiscount).toHaveBeenNthCalledWith(
      1,
      hugeCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    // percentage 쿠폰 적용
    expect(calculateCouponDiscount).toHaveBeenNthCalledWith(
      2,
      percentCoupon,
      mockItems,
      0, // remainingPrice는 0
      shippingFee
    );

    expect(totalDiscount).toBe(100000); // 100000 + 0
  });
});
