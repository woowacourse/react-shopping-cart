import { getTotalDiscountPrice } from "../calculateCoupon";
import { getAllValidCoupons } from "../validateCoupon";
import type { CouponType } from "../../../types/response";

describe("쿠폰 할인 계산", () => {
  const fixedCoupon: CouponType = {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인",
    discountType: "fixed",
    discount: 5000,
    minimumAmount: 10000,
    expirationDate: "2099-12-31",
  };
  const percentCoupon: CouponType = {
    id: 2,
    code: "PERCENT10",
    description: "10% 할인",
    discountType: "percentage",
    discount: 10,
    availableTime: {
      start: "2000-01-01T00:00:00Z",
      end: "2099-12-31T23:59:59Z",
    },
    expirationDate: "2099-12-31",
  };

  const freeShippingCoupon: CouponType = {
    id: 4,
    code: "FREESHIPPING",
    description: "무료배송",
    discountType: "freeShipping",
    minimumAmount: 10000,
    expirationDate: "2099-12-31",
  };
  const orderItems = [
    {
      id: 1,
      quantity: 1,
      product: { id: 1, name: "A", price: 10000, imageUrl: "", category: "" },
    },
  ];

  it("FIXED 쿠폰일 경우 정해진 금액만큼 할인된다", () => {
    const checkedCoupons = new Map([
      [fixedCoupon.id, fixedCoupon as CouponType],
    ]);
    const discount = getTotalDiscountPrice(checkedCoupons, {
      originOrderPrice: 20000,
      deliveryFee: 3000,
    });
    expect(discount).toBe(5000);
  });

  it("PERCENT 쿠폰일 경우 정해진 퍼센트만큼 할인된다", () => {
    const checkedCoupons = new Map([
      [percentCoupon.id, percentCoupon as CouponType],
    ]);
    const discount = getTotalDiscountPrice(checkedCoupons, {
      originOrderPrice: 20000,
      deliveryFee: 3000,
    });
    expect(discount).toBe(2000);
  });

  it("FREESHIPPING 쿠폰일 경우 무료 배송이 적용된다", () => {
    const valid = getAllValidCoupons([freeShippingCoupon], {
      originOrderPrice: 20000,
      orderItems,
      deliveryFee: 3000,
    });
    expect(valid).toHaveLength(1);
    const checkedCoupons = new Map([
      [freeShippingCoupon.id, freeShippingCoupon as CouponType],
    ]);
    const discount = getTotalDiscountPrice(checkedCoupons, {
      originOrderPrice: 20000,
      deliveryFee: 3000,
    });
    expect(discount).toBe(3000);
  });

  it("FIXED + PERCENT 쿠폰을 함께 적용하면 합산 할인된다", () => {
    const checkedCoupons = new Map([
      [fixedCoupon.id, fixedCoupon as CouponType],
      [percentCoupon.id, percentCoupon as CouponType],
    ]);
    const discount = getTotalDiscountPrice(checkedCoupons, {
      originOrderPrice: 20000,
      deliveryFee: 3000,
    });

    expect(discount).toBe(7000);
  });

  it("FIXED + FREESHIPPING 쿠폰을 함께 적용하면 합산 할인된다", () => {
    const checkedCoupons = new Map([
      [fixedCoupon.id, fixedCoupon as CouponType],
      [freeShippingCoupon.id, freeShippingCoupon as CouponType],
    ]);
    const discount = getTotalDiscountPrice(checkedCoupons, {
      originOrderPrice: 20000,
      deliveryFee: 3000,
    });

    expect(discount).toBe(8000);
  });

  it("PERCENT + FREESHIPPING 쿠폰을 함께 적용하면 합산 할인된다", () => {
    const checkedCoupons = new Map([
      [percentCoupon.id, percentCoupon as CouponType],
      [freeShippingCoupon.id, freeShippingCoupon as CouponType],
    ]);
    const discount = getTotalDiscountPrice(checkedCoupons, {
      originOrderPrice: 20000,
      deliveryFee: 3000,
    });

    expect(discount).toBe(5000);
  });

  it("FIXED + PERCENT + FREESHIPPING 쿠폰을 함께 적용하면 합산 할인된다", () => {
    const checkedCoupons = new Map([
      [fixedCoupon.id, fixedCoupon as CouponType],
      [percentCoupon.id, percentCoupon as CouponType],
      [freeShippingCoupon.id, freeShippingCoupon as CouponType],
    ]);
    const discount = getTotalDiscountPrice(checkedCoupons, {
      originOrderPrice: 20000,
      deliveryFee: 3000,
    });

    expect(discount).toBe(10000);
  });
});
