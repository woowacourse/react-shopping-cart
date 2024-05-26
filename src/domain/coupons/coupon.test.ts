import { CouponType } from "../../types/Coupon";
import { CartItemQuantityAndPrice } from "../../types/ShoppingCart";
import BuyXgetYCoupon from "./BuyXgetYCoupon";
import FixedCoupon from "./FixedCoupon";
import FreeShippingCoupon from "./FreeShippingCoupon";
import PercentageCoupon from "./PercentageCoupon";

const basedMockedCoupon: CouponType = {
  id: 1,
  code: "FIXED5000",
  description: "5,000원 할인 쿠폰",
  expirationDate: "2024-11-30",
  discount: 5000,
  discountType: "fixed",
};

const totalAmount = 0;

describe("쿠폰 사용가능 여부 테스트", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-22"));
  });

  it("쿠폰의 유효기간이 지나면 사용할 수 없다", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    mockedCoupon.expirationDate = "2024-05-20";

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(totalAmount)).toBe(false);
  });

  it("특정 시간대에만 사용할 수 있는 쿠폰은 해당 시간대에만 사용할 수 있다", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);

    jest.spyOn(Date.prototype, "getHours").mockReturnValue(5);
    jest.spyOn(Date.prototype, "getMinutes").mockReturnValue(30);
    jest.spyOn(Date.prototype, "getSeconds").mockReturnValue(0);

    mockedCoupon.availableTime = {
      start: "04:00:00",
      end: "07:00:00",
    };

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(totalAmount)).toBe(true);
    jest.restoreAllMocks();
  });

  it("특정 시간대에만 사용할 수 있는 쿠폰은 해당 시간대가 아니면 사용할 수 없다", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);

    jest.spyOn(Date.prototype, "getHours").mockReturnValue(10);
    jest.spyOn(Date.prototype, "getMinutes").mockReturnValue(30);
    jest.spyOn(Date.prototype, "getSeconds").mockReturnValue(0);

    mockedCoupon.availableTime = {
      start: "04:00:00",
      end: "07:00:00",
    };

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(totalAmount)).toBe(false);
    jest.restoreAllMocks();
  });

  it("주문 최소금액을 넘어야 사용할 수 있다", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    mockedCoupon.minimumAmount = 50000;

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(50000)).toBe(true);
    expect(coupon.isAvailable(60000)).toBe(true);
    expect(coupon.isAvailable(100000)).toBe(true);
  });

  it("주문 최소금액을 넘지 않으면 사용할 수 없다", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    mockedCoupon.minimumAmount = 50000;

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(0)).toBe(false);
    expect(coupon.isAvailable(1000)).toBe(false);
    expect(coupon.isAvailable(49000)).toBe(false);
  });

  it("특정 시간대, 최소 주문금액 2가지 조건이 있는 경우 모두 만족해야 사용할 수 있다", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    mockedCoupon.minimumAmount = 50000;
    mockedCoupon.availableTime = {
      start: "04:00:00",
      end: "07:00:00",
    };

    jest.spyOn(Date.prototype, "getHours").mockReturnValue(5);
    jest.spyOn(Date.prototype, "getMinutes").mockReturnValue(30);
    jest.spyOn(Date.prototype, "getSeconds").mockReturnValue(0);

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(50000)).toBe(true);
    expect(coupon.isAvailable(60000)).toBe(true);
  });

  it("특정 시간대, 최소 주문금액 2가지 조건이 있는 경우 모두 만족하지 않으면 사용할 수 없다. (시간대가 일치하지 않는 경우)", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    mockedCoupon.minimumAmount = 50000;
    mockedCoupon.availableTime = {
      start: "04:00:00",
      end: "07:00:00",
    };

    jest.spyOn(Date.prototype, "getHours").mockReturnValue(9);
    jest.spyOn(Date.prototype, "getMinutes").mockReturnValue(30);
    jest.spyOn(Date.prototype, "getSeconds").mockReturnValue(0);

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(50000)).toBe(false);
    expect(coupon.isAvailable(60000)).toBe(false);
  });

  it("특정 시간대, 최소 주문금액 2가지 조건이 있는 경우 모두 만족하지 않으면 사용할 수 없다. (최소 주문금액이 일치하지 않는 경우)", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    mockedCoupon.minimumAmount = 50000;
    mockedCoupon.availableTime = {
      start: "04:00:00",
      end: "07:00:00",
    };

    jest.spyOn(Date.prototype, "getHours").mockReturnValue(5);
    jest.spyOn(Date.prototype, "getMinutes").mockReturnValue(30);
    jest.spyOn(Date.prototype, "getSeconds").mockReturnValue(0);

    const coupon = new FixedCoupon(mockedCoupon);

    expect(coupon.isAvailable(10000)).toBe(false);
    expect(coupon.isAvailable(40000)).toBe(false);
  });
});

it("특정 시간대, 최소 주문금액 2가지 조건이 있는 경우 모두 만족하지 않으면 사용할 수 없다. (두가지 모두 일치하지 않는 경우)", () => {
  const mockedCoupon = Object.assign({}, basedMockedCoupon);
  mockedCoupon.minimumAmount = 50000;
  mockedCoupon.availableTime = {
    start: "04:00:00",
    end: "07:00:00",
  };

  jest.spyOn(Date.prototype, "getHours").mockReturnValue(9);
  jest.spyOn(Date.prototype, "getMinutes").mockReturnValue(30);
  jest.spyOn(Date.prototype, "getSeconds").mockReturnValue(0);

  const coupon = new FixedCoupon(mockedCoupon);

  expect(coupon.isAvailable(10000)).toBe(false);
  expect(coupon.isAvailable(40000)).toBe(false);
});

describe("쿠폰 할인율 테스트", () => {
  it("구매 금액에 상관없이 고정된 금액을 할인한다. (FixedCoupon)", () => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    const fixedCoupon = new FixedCoupon(mockedCoupon);

    expect(fixedCoupon.discountAmount()).toBe(5000);
  });

  it.each([
    [10_000, 10, 1_000],
    [100_000, 20, 20_000],
    [50_000, 30, 15_000],
  ])(
    "구매 금액의 퍼센트 금액을 할인한다. (PercentageCoupon)",
    (totalAmount: number, percentageRate: number, discountAmount: number) => {
      const mockedCoupon = Object.assign({}, basedMockedCoupon);
      mockedCoupon.discountType = "percentage";
      mockedCoupon.discount = percentageRate;
      const percentageCoupon = new PercentageCoupon(mockedCoupon);

      expect(percentageCoupon.discountAmount({ amount: totalAmount })).toBe(discountAmount);
    }
  );

  it.each([3000, 5000, 6000])("구매 금액에 상관없이 배송비를 할인한다. (FreeShippingCoupon)", (shippingFee: number) => {
    const mockedCoupon = Object.assign({}, basedMockedCoupon);
    mockedCoupon.discountType = "freeShipping";
    const freeShippingCoupon = new FreeShippingCoupon(mockedCoupon);

    expect(freeShippingCoupon.discountAmount({ shippingFee })).toBe(shippingFee);
  });

  describe("X개 구매하면 Y개 만큼 할인 쿠폰 테스트", () => {
    it("4개 구매한 상품에 3+2 쿠폰이 적용된다면 1개의 금액을 할인해준다.", () => {
      const mockedCoupon = Object.assign({}, basedMockedCoupon);
      mockedCoupon.discountType = "buyXgetY";
      mockedCoupon.buyQuantity = 3;
      mockedCoupon.getQuantity = 2;

      const buyXgetYCoupon = new BuyXgetYCoupon(mockedCoupon);

      const mockedItemInfo: CartItemQuantityAndPrice[] = [
        {
          id: 1,
          quantity: 4,
          price: 1000,
        },
      ];

      expect(buyXgetYCoupon.discountAmount({ itemInfo: mockedItemInfo })).toBe(1000);
    });

    it("여러개의 아이템 중 가장 할인율이 큰 상품에만 할인이 적용된다", () => {
      const mockedCoupon = Object.assign({}, basedMockedCoupon);
      mockedCoupon.discountType = "buyXgetY";
      mockedCoupon.buyQuantity = 2;
      mockedCoupon.getQuantity = 1;

      const buyXgetYCoupon = new BuyXgetYCoupon(mockedCoupon);

      const mockedItemInfo: CartItemQuantityAndPrice[] = [
        {
          id: 1,
          quantity: 3,
          price: 1000,
        },
        {
          id: 2,
          quantity: 10,
          price: 500,
        },
        {
          id: 3,
          quantity: 5,
          price: 10000,
        },
        {
          id: 4,
          quantity: 50,
          price: 5000,
        },
      ];

      expect(buyXgetYCoupon.discountAmount({ itemInfo: mockedItemInfo })).toBe(10000);
    });
  });
});
