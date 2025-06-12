import {
  getValidExpirationCoupons,
  getAllValidCoupons,
  getValidBogoCoupons,
  isValid,
} from "../validateCoupon";
import type { CouponType, CartItemType } from "../../../types/response";

const baseProduct = {
  id: 1,
  name: "상품",
  price: 10000,
  imageUrl: "",
  category: "테스트",
};
const baseCartItem: CartItemType = {
  id: 1,
  quantity: 1,
  product: baseProduct,
};

describe("쿠폰 유효성 검사", () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const fixedCoupon: CouponType = {
    id: 1,
    code: "FIXED",
    description: "고정 할인",
    discountType: "fixed",
    discount: 1000,
    minimumAmount: 10000,
    expirationDate: tomorrow.toISOString(),
  };
  const expiredCoupon: CouponType = {
    ...fixedCoupon,
    id: 2,
    code: "EXPIRED",
    expirationDate: yesterday.toISOString(),
  };
  const percentCoupon: CouponType = {
    id: 3,
    code: "PERCENT",
    description: "10% 할인",
    discountType: "percentage",
    discount: 10,
    availableTime: {
      start: yesterday.toISOString(),
      end: tomorrow.toISOString(),
    },
    expirationDate: tomorrow.toISOString(),
  };
  const outOfTimeCoupon: CouponType = {
    ...percentCoupon,
    id: 4,
    code: "OUTOFTIME",
    availableTime: {
      start: yesterday.toISOString(),
      end: yesterday.toISOString(),
    },
  };
  const freeShippingCoupon: CouponType = {
    id: 5,
    code: "FREESHIP",
    description: "무료배송",
    discountType: "freeShipping",
    minimumAmount: 10000,
    expirationDate: tomorrow.toISOString(),
  };
  const bogoCoupon: CouponType = {
    id: 6,
    code: "BOGO",
    description: "1+1",
    discountType: "buyXgetY",
    buyQuantity: 2,
    getQuantity: 1,
    expirationDate: tomorrow.toISOString(),
  };

  it("유효기간이 지난 쿠폰은 제외된다", () => {
    const result = getValidExpirationCoupons([fixedCoupon, expiredCoupon]);
    expect(result).toContain(fixedCoupon);
    expect(result).not.toContain(expiredCoupon);
  });

  it("최소주문금액 미만이면 쿠폰이 제외된다", () => {
    const result = getAllValidCoupons([fixedCoupon], {
      originOrderPrice: 9000,
      orderItems: [baseCartItem],
      deliveryFee: 3000,
    });
    expect(result).toHaveLength(0);
    const result2 = getAllValidCoupons([fixedCoupon], {
      originOrderPrice: 10000,
      orderItems: [baseCartItem],
      deliveryFee: 3000,
    });
    expect(result2).toHaveLength(1);
  });

  it("미라클타임(availableTime) 벗어나면 쿠폰이 제외된다", () => {
    const result = getAllValidCoupons([percentCoupon, outOfTimeCoupon], {
      originOrderPrice: 10000,
      orderItems: [baseCartItem],
      deliveryFee: 3000,
    });
    expect(result).toContain(percentCoupon);
    expect(result).not.toContain(outOfTimeCoupon);
  });

  it("무료배송 쿠폰: 배송비 0원이면 제외된다", () => {
    const result = getAllValidCoupons([freeShippingCoupon], {
      originOrderPrice: 10000,
      orderItems: [baseCartItem],
      deliveryFee: 0,
    });
    expect(result).toHaveLength(0);
    const result2 = getAllValidCoupons([freeShippingCoupon], {
      originOrderPrice: 10000,
      orderItems: [baseCartItem],
      deliveryFee: 3000,
    });
    expect(result2).toHaveLength(1);
  });

  it("BOGO 쿠폰: buyQuantity 미만 수량이면 제외된다", () => {
    const result = getValidBogoCoupons([bogoCoupon], {
      orderItems: [baseCartItem],
    });
    expect(result).toHaveLength(0);
    const enoughItem = { ...baseCartItem, quantity: 2 };
    const result2 = getValidBogoCoupons([bogoCoupon], {
      orderItems: [enoughItem],
    });
    expect(result2).toHaveLength(1);
  });

  it("모든 조건을 통과한 쿠폰만 남는다", () => {
    const enoughItem = { ...baseCartItem, quantity: 2 };
    const all = [
      fixedCoupon,
      expiredCoupon,
      percentCoupon,
      outOfTimeCoupon,
      freeShippingCoupon,
      bogoCoupon,
    ];
    const result = getAllValidCoupons(all, {
      originOrderPrice: 10000,
      orderItems: [enoughItem],
      deliveryFee: 3000,
    });
    expect(result).toContain(fixedCoupon);
    expect(result).toContain(percentCoupon);
    expect(result).toContain(freeShippingCoupon);
    expect(result).toContain(bogoCoupon);
    expect(result).not.toContain(expiredCoupon);
    expect(result).not.toContain(outOfTimeCoupon);
  });

  it("선택 제한(COUPON_LIMIT) 초과 시 false, 이미 선택된 쿠폰은 true", () => {
    const validList = [fixedCoupon, percentCoupon];
    const checked = new Map<number, CouponType>([
      [fixedCoupon.id, fixedCoupon],
      [percentCoupon.id, percentCoupon],
    ]);

    expect(isValid(validList, checked, freeShippingCoupon.id)).toBe(false);
    expect(isValid(validList, checked, fixedCoupon.id)).toBe(true);
  });
});
