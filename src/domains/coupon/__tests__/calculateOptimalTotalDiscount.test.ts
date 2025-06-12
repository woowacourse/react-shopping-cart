import { CartItemWithSelection } from "../../cart/types/response";
import { calculateCouponDiscount } from "../calculations/combined/calculateCouponDiscount";
import { calculateDiscountSequence } from "../calculations/combined/calculateDiscountSequence";
import { calculateOptimalTotalDiscount } from "../calculations/combined/calculateOptimalTotalDiscount";
import { Coupon } from "../types/response";

jest.mock("../calculations/combined/calculateCouponDiscount");
jest.mock("../calculations/combined/calculateDiscountSequence");

describe("calculateOptimalTotalDiscount 함수 테스트", () => {
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

  it("쿠폰이 없는 경우 0을 반환한다", () => {
    const result = calculateOptimalTotalDiscount({
      coupons: [],
      orderItems: mockItems,
      orderPrice,
      shippingFee,
    });

    expect(result).toBe(0);
    expect(calculateCouponDiscount).not.toHaveBeenCalled();
    expect(calculateDiscountSequence).not.toHaveBeenCalled();
  });

  it("쿠폰이 1개인 경우 calculateDiscountSequence를 호출한다", () => {
    (calculateDiscountSequence as jest.Mock).mockReturnValue(10000);

    const result = calculateOptimalTotalDiscount({
      coupons: [fixedCoupon],
      orderItems: mockItems,
      orderPrice,
      shippingFee,
    });

    expect(calculateDiscountSequence).toHaveBeenCalledWith({
      coupons: [fixedCoupon],
      orderItems: mockItems,
      initialOrderPrice: orderPrice,
      initialShippingFee: shippingFee,
    });
    expect(result).toBe(10000);
  });

  it("쿠폰이 2개인 경우 두 가지 순서로 calculateDiscountSequence을 호출하고 더 큰 할인을 선택한다 (AB > BA)", () => {
    (calculateDiscountSequence as jest.Mock)
      .mockReturnValueOnce(25000) // A -> B 순서 (25000원 할인)
      .mockReturnValueOnce(20000); // B -> A 순서 (20000원 할인)

    const result = calculateOptimalTotalDiscount({
      coupons: [fixedCoupon, percentCoupon],
      orderItems: mockItems,
      orderPrice,
      shippingFee,
    });

    expect(calculateDiscountSequence).toHaveBeenNthCalledWith(1, {
      coupons: [fixedCoupon, percentCoupon],
      orderItems: mockItems,
      initialOrderPrice: orderPrice,
      initialShippingFee: shippingFee,
    });

    expect(calculateDiscountSequence).toHaveBeenNthCalledWith(2, {
      coupons: [percentCoupon, fixedCoupon],
      orderItems: mockItems,
      initialOrderPrice: orderPrice,
      initialShippingFee: shippingFee,
    });

    expect(result).toBe(25000);
  });

  it("쿠폰이 2개인 경우 두 가지 순서로 calculateDiscountSequence을 호출하고 더 큰 할인을 선택한다 (BA > AB)", () => {
    (calculateDiscountSequence as jest.Mock)
      .mockReturnValueOnce(18000) // A -> B 순서 (18000원 할인)
      .mockReturnValueOnce(23000); // B -> A 순서 (23000원 할인)

    const result = calculateOptimalTotalDiscount({
      coupons: [fixedCoupon, percentCoupon],
      orderItems: mockItems,
      orderPrice,
      shippingFee,
    });

    expect(calculateDiscountSequence).toHaveBeenNthCalledWith(1, {
      coupons: [fixedCoupon, percentCoupon],
      orderItems: mockItems,
      initialOrderPrice: orderPrice,
      initialShippingFee: shippingFee,
    });

    expect(calculateDiscountSequence).toHaveBeenNthCalledWith(2, {
      coupons: [percentCoupon, fixedCoupon],
      orderItems: mockItems,
      initialOrderPrice: orderPrice,
      initialShippingFee: shippingFee,
    });

    expect(result).toBe(23000);
  });

  it("쿠폰이 2개이고 할인 금액이 같은 경우 해당 할인 금액을 반환한다", () => {
    (calculateDiscountSequence as jest.Mock)
      .mockReturnValueOnce(15000) // A -> B 순서 (15000원 할인)
      .mockReturnValueOnce(15000); // B -> A 순서 (15000원 할인)

    const result = calculateOptimalTotalDiscount({
      coupons: [fixedCoupon, shippingCoupon],
      orderItems: mockItems,
      orderPrice,
      shippingFee,
    });

    expect(calculateDiscountSequence).toHaveBeenCalledTimes(2);
    expect(result).toBe(15000);
  });

  it("쿠폰이 3개인 경우 모든 순열 조합 중에 가장 큰 할인 값을 반환한다", () => {
    // 3개의 쿠폰의 가능한 순열은 총 6가지(3!): ABC, ACB, BAC, BCA, CAB, CBA
    [18000, 15000, 20000, 17000, 16000, 14000].forEach((value) => {
      (calculateDiscountSequence as jest.Mock).mockReturnValueOnce(value);
    });

    const result = calculateOptimalTotalDiscount({
      coupons: [fixedCoupon, percentCoupon, shippingCoupon],
      orderItems: mockItems,
      orderPrice,
      shippingFee,
    });

    expect(calculateDiscountSequence).toHaveBeenCalledTimes(6);
    expect(result).toBe(20000);
  });
});
