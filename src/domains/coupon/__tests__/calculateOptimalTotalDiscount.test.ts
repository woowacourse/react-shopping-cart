import { CartItemWithSelection } from "../../cart/types/response";
import { calculateCouponDiscount } from "../calculations/combined/calculateCouponDiscount";
import { calculateDiscountChain } from "../calculations/combined/calculateDiscountChain";
import { calculateOptimalTotalDiscount } from "../calculations/combined/calculateOptimalTotalDiscount";
import { Coupon } from "../types/response";

jest.mock("../calculations/combined/calculateCouponDiscount");
jest.mock("../calculations/combined/calculateDiscountChain");

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
    const result = calculateOptimalTotalDiscount(
      [],
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(result).toBe(0);
    expect(calculateCouponDiscount).not.toHaveBeenCalled();
    expect(calculateDiscountChain).not.toHaveBeenCalled();
  });

  it("쿠폰이 1개인 경우 calculateCouponDiscount를 호출한다", () => {
    (calculateCouponDiscount as jest.Mock).mockReturnValue(10000);

    const result = calculateOptimalTotalDiscount(
      [fixedCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(calculateCouponDiscount).toHaveBeenCalledWith(
      fixedCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );
    expect(calculateDiscountChain).not.toHaveBeenCalled();
    expect(result).toBe(10000);
  });

  it("쿠폰이 2개인 경우 두 가지 순서로 calculateDiscountChain을 호출하고 더 큰 할인을 선택한다 (AB > BA)", () => {
    (calculateDiscountChain as jest.Mock)
      .mockReturnValueOnce(25000) // A -> B 순서 (25000원 할인)
      .mockReturnValueOnce(20000); // B -> A 순서 (20000원 할인)

    const result = calculateOptimalTotalDiscount(
      [fixedCoupon, percentCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(calculateDiscountChain).toHaveBeenNthCalledWith(
      1,
      fixedCoupon,
      percentCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(calculateDiscountChain).toHaveBeenNthCalledWith(
      2,
      percentCoupon,
      fixedCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(result).toBe(25000);
  });

  it("쿠폰이 2개인 경우 두 가지 순서로 calculateDiscountChain을 호출하고 더 큰 할인을 선택한다 (BA > AB)", () => {
    (calculateDiscountChain as jest.Mock)
      .mockReturnValueOnce(18000) // A -> B 순서 (18000원 할인)
      .mockReturnValueOnce(23000); // B -> A 순서 (23000원 할인)

    const result = calculateOptimalTotalDiscount(
      [fixedCoupon, percentCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(calculateDiscountChain).toHaveBeenNthCalledWith(
      1,
      fixedCoupon,
      percentCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(calculateDiscountChain).toHaveBeenNthCalledWith(
      2,
      percentCoupon,
      fixedCoupon,
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(result).toBe(23000);
  });

  it("쿠폰이 2개이고 할인 금액이 같은 경우 해당 할인 금액을 반환한다", () => {
    (calculateDiscountChain as jest.Mock)
      .mockReturnValueOnce(15000) // A -> B 순서 (15000원 할인)
      .mockReturnValueOnce(15000); // B -> A 순서 (15000원 할인)

    const result = calculateOptimalTotalDiscount(
      [fixedCoupon, shippingCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(calculateDiscountChain).toHaveBeenCalledTimes(2);
    expect(result).toBe(15000);
  });

  it("쿠폰이 3개 이상인 경우 0을 반환한다", () => {
    const result = calculateOptimalTotalDiscount(
      [fixedCoupon, percentCoupon, shippingCoupon],
      mockItems,
      orderPrice,
      shippingFee
    );

    expect(calculateCouponDiscount).not.toHaveBeenCalled();
    expect(calculateDiscountChain).not.toHaveBeenCalled();
    expect(result).toBe(0);
  });
});
