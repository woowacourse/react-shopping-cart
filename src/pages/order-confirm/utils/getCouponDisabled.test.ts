import { CartItemType } from "@/apis/cartItems/cartItem.type";
import {
  Coupon,
  FixedCoupon,
  BuyXGetYCoupon,
  FreeShippingCoupon,
  PercentageCoupon,
} from "@/apis/coupon/coupon.type";
import { getIsCouponDisabled } from "./getCouponDisabled";
import { formatDate } from "@/shared/utils/formatDate";
import { parseDate } from "@/shared/utils/parseDate";

const createMockCartItem = (price: number, quantity: number): CartItemType => ({
  id: 1,
  quantity,
  product: {
    id: 1,
    name: "Test Product",
    price,
    imageUrl: "",
    quantity: 999,
  },
});

const baseCoupon = { id: 1, code: "", description: "Test Coupon" };
const createMockCoupon = <T extends Coupon>(coupon: T): T => coupon;

const generateSafeTestDate = () => {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  const year = nextDay.getFullYear();
  const month = String(nextDay.getMonth() + 1).padStart(2, "0");
  const day = String(nextDay.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getNextDaySafe = (dateStr: string) => {
  const date = parseDate(dateStr);
  date.setDate(date.getDate() + 1);
  return formatDate(date);
};

const getPrevDaySafe = (dateStr: string) => {
  const date = parseDate(dateStr);
  date.setDate(date.getDate() - 1);
  return formatDate(date);
};

describe("쿠폰 적용 조건 테스트", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  describe("FixedCoupon disabled 테스트", () => {
    const safeTestDate = generateSafeTestDate();
    const fixedCoupon = createMockCoupon<FixedCoupon>({
      ...baseCoupon,
      discountType: "fixed",
      discount: 5000,
      minimumAmount: 50000,
      expirationDate: safeTestDate,
    });

    it("주문 금액이 최소 금액 미만일 때 비활성화", () => {
      const cartItems = [createMockCartItem(10000, 4)];
      expect(getIsCouponDisabled(fixedCoupon, cartItems)).toBe(true);
    });

    it("주문 금액이 최소 금액과 동일할 때 활성화", () => {
      const cartItems = [createMockCartItem(25000, 2)];
      expect(getIsCouponDisabled(fixedCoupon, cartItems)).toBe(false);
    });

    it("만료 기한이 넘은 경우 비활성화", () => {
      const date = new Date(`${getNextDaySafe(safeTestDate)}T00:00:00`);
      vi.setSystemTime(date);
      const cartItems = [createMockCartItem(25000, 2)];
      expect(getIsCouponDisabled(fixedCoupon, cartItems)).toBe(true);
    });

    it("만료 기한이 넘지 않은 경우 활성화", () => {
      const date = new Date(`${getPrevDaySafe(safeTestDate)}T23:59:59`);
      vi.setSystemTime(date);
      const cartItems = [createMockCartItem(25000, 2)];
      expect(getIsCouponDisabled(fixedCoupon, cartItems)).toBe(false);
    });
  });

  describe("BuyXGetYCoupon disabled 테스트", () => {
    const buyQuantity = 2;
    const getQuantity = 1;
    const safeTestDate = generateSafeTestDate();
    const buyXGetYCoupon = createMockCoupon<BuyXGetYCoupon>({
      ...baseCoupon,
      discountType: "buyXgetY",
      buyQuantity,
      getQuantity,
      expirationDate: safeTestDate,
    });

    it(`${buyQuantity}+${getQuantity} 조건에 맞는 상품이 있을 때 활성화`, () => {
      const cartItems = [createMockCartItem(10000, buyQuantity + getQuantity)];
      expect(getIsCouponDisabled(buyXGetYCoupon, cartItems)).toBe(false);
    });

    it(`모든 상품이 ${buyQuantity}+${getQuantity} 조건 미만일 때 비활성화`, () => {
      const cartItems = [
        createMockCartItem(10000, 1),
        createMockCartItem(20000, 1),
      ];
      expect(getIsCouponDisabled(buyXGetYCoupon, cartItems)).toBe(true);
    });

    it("만료 기한이 넘은 경우 비활성화", () => {
      const date = new Date(`${getNextDaySafe(safeTestDate)}T00:00:00`);
      vi.setSystemTime(date);
      const cartItems = [createMockCartItem(25000, buyQuantity + getQuantity)];
      expect(getIsCouponDisabled(buyXGetYCoupon, cartItems)).toBe(true);
    });

    it("만료 기한이 넘지 않은 경우 활성화", () => {
      const date = new Date(`${getPrevDaySafe(safeTestDate)}T23:59:59`);
      vi.setSystemTime(date);
      const cartItems = [createMockCartItem(25000, buyQuantity + getQuantity)];
      expect(getIsCouponDisabled(buyXGetYCoupon, cartItems)).toBe(false);
    });
  });

  describe("FreeShipping disabled 테스트", () => {
    const safeTestDate = generateSafeTestDate();
    const freeShipping = createMockCoupon<FreeShippingCoupon>({
      ...baseCoupon,
      discountType: "freeShipping",
      minimumAmount: 50000,
      expirationDate: safeTestDate,
    });

    it("주문 금액이 최소 금액 미만일 때 비활성화", () => {
      const cartItems = [createMockCartItem(10000, 4)];
      expect(getIsCouponDisabled(freeShipping, cartItems)).toBe(true);
    });

    it("주문 금액이 최소 금액과 동일할 때 활성화", () => {
      const cartItems = [createMockCartItem(25000, 2)];
      expect(getIsCouponDisabled(freeShipping, cartItems)).toBe(false);
    });

    it("만료 기한이 넘은 경우 비활성화", () => {
      const date = new Date(`${getNextDaySafe(safeTestDate)}T00:00:00`);
      vi.setSystemTime(date);
      const cartItems = [createMockCartItem(25000, 2)];
      expect(getIsCouponDisabled(freeShipping, cartItems)).toBe(true);
    });

    it("만료 기한이 넘지 않은 경우 활성화", () => {
      const date = new Date(`${getPrevDaySafe(safeTestDate)}T23:59:59`);
      vi.setSystemTime(date);
      const cartItems = [createMockCartItem(25000, 2)];
      expect(getIsCouponDisabled(freeShipping, cartItems)).toBe(false);
    });
  });

  describe("PercentageCoupon disabled 테스트", () => {
    const availableTime = { start: "04:00:00", end: "07:00:00" };
    const safeTestDate = generateSafeTestDate();
    const miracleCoupon = createMockCoupon<PercentageCoupon>({
      ...baseCoupon,
      discountType: "percentage",
      discount: 30,
      expirationDate: safeTestDate,
      availableTime,
    });

    it("만료 기한이 넘은 경우 비활성화", () => {
      const date = new Date(
        `${getNextDaySafe(safeTestDate)}T${availableTime.start}`
      );
      vi.setSystemTime(date);
      expect(getIsCouponDisabled(miracleCoupon, [])).toBe(true);
    });

    it("만료 기한이 넘지 않은 경우 활성화", () => {
      const date = new Date(
        `${getPrevDaySafe(safeTestDate)}T${availableTime.start}`
      );
      vi.setSystemTime(date);
      expect(getIsCouponDisabled(miracleCoupon, [])).toBe(false);
    });

    it(`${availableTime.start} 1초 전에 비활성화`, () => {
      const date = new Date(
        `${getPrevDaySafe(safeTestDate)}T${availableTime.start}`
      );
      date.setSeconds(date.getSeconds() - 1);
      vi.setSystemTime(date);
      expect(getIsCouponDisabled(miracleCoupon, [])).toBe(true);
    });

    it(`${availableTime.end} 1초 후에 비활성화`, () => {
      const date = new Date(
        `${getPrevDaySafe(safeTestDate)}T${availableTime.end}`
      );
      date.setSeconds(date.getSeconds() + 1);
      vi.setSystemTime(date);
      expect(getIsCouponDisabled(miracleCoupon, [])).toBe(true);
    });

    it(`${availableTime.start} ~ ${availableTime.end} 사이에 활성화`, () => {
      const startDate = new Date(
        `${getPrevDaySafe(safeTestDate)}T${availableTime.start}`
      );
      vi.setSystemTime(startDate);
      expect(getIsCouponDisabled(miracleCoupon, [])).toBe(false);

      const endDate = new Date(
        `${getPrevDaySafe(safeTestDate)}T${availableTime.end}`
      );
      vi.setSystemTime(endDate);
      expect(getIsCouponDisabled(miracleCoupon, [])).toBe(false);
    });
  });
});
