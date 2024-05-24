import { snapshot_UNSTABLE } from "recoil";
import { Coupon } from "../../types/Coupon";
import { checkedIdSetSelector } from "../cart/checkedState";
import { mockCartItems } from "../mocks";
import { validateCouponAplicability } from "./validateCouponApplicability";

// 가능여부 : 동적 판단 (덕타이핑).
// 할인 : 정적 검사. DiscountType

jest.mock("../../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));
const COUPON_MIN_AMOUNT: Coupon = {
  id: 1,
  code: "FIXED5000",
  description: "5,000원 할인 쿠폰",
  expirationDate: "2024-11-30",
  discount: 5000,
  minimumAmount: 100000,
  discountType: "fixed",
};
describe("Coupon 적용가능 여부 테스트", () => {
  describe("minimumAmount 조건 쿠폰", () => {
    it("주문금액이 minimumAmount보다 작을 때, 적용 불가능하다.", () => {
      const CHECKED_IDS_FOR_LOW_ORDER_PRICE = [1];
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, new Set(CHECKED_IDS_FOR_LOW_ORDER_PRICE));
      });

      expect(validateCouponAplicability(COUPON_MIN_AMOUNT, snapshot)).toBe(false);
    });
    it("주문금액이 minimumAmount보다 클 때, 적용 가능하다.", () => {
      const CHECKED_IDS_FOR_HIGH_ORDER_PRICE = [1, 2];
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, new Set(CHECKED_IDS_FOR_HIGH_ORDER_PRICE));
      });

      expect(validateCouponAplicability(COUPON_MIN_AMOUNT, snapshot)).toBe(true);
    });
  });
});
