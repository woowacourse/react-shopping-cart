import { snapshot_UNSTABLE } from "recoil";
import { mockCartItems, mockCouponList } from "../mocks";
import {
  couponDiscountPriceSelectorFamily,
  couponIdSetSelector,
  couponSelectorFamily,
  isSelectedCouponAtomFamily,
  selectedCouponSetSelector,
} from "./couponState";
import { Coupon, FixedDiscount } from "src/types/Coupon";
import { checkedIdSetSelector } from "../cart/checkedState";

jest.mock("../../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));
jest.mock("../../api/coupon", () => ({ fetchCouponList: () => mockCouponList }));
describe("couponState 테스트", () => {
  describe("couponSelectorFamily", () => {
    it("존재하는 쿠폰의 id을 넣어 get했을때, id에 맞는 쿠폰을 반환한다.", () => {
      const EXISTING_ID = 1;
      const snapshot = snapshot_UNSTABLE();

      expect(snapshot.getLoadable(couponSelectorFamily(EXISTING_ID)).contents).toEqual(mockCouponList[0]);
    });
    it("존재하지 않는 쿠폰의 id을 넣어 get했을때, undefined을 반환한다.", () => {
      const NON_EXISTING_ID = 5;
      const snapshot = snapshot_UNSTABLE();

      expect(snapshot.getLoadable(couponSelectorFamily(NON_EXISTING_ID)).contents).toEqual(undefined);
    });
  });
  describe("couponIdSelector", () => {
    it("존재하는 쿠폰의 id를 Set으로 반환한다.", () => {
      const snapshot = snapshot_UNSTABLE();

      expect(snapshot.getLoadable(couponIdSetSelector).contents).toEqual(new Set([1, 2, 3, 4]));
    });
  });

  describe("isSelectedAtomSelectorFamily", () => {
    it("기본값은 false를 반환한다.", () => {
      const snapshot = snapshot_UNSTABLE();

      expect(snapshot.getLoadable(isSelectedCouponAtomFamily(1)).contents).toBe(false);
    });
  });

  describe("selectedCouponIdSetSelector", () => {
    it("아무것도 선택되지 않았을 때, 빈 Set을 반환한다.", () => {
      const snapshot = snapshot_UNSTABLE();

      expect(snapshot.getLoadable(selectedCouponSetSelector).contents).toEqual(new Set());
    });
    describe("하나의 쿠폰만 선택된 상태일 때, 해당 id만 담은 Set을 반환한다.", () => {
      it.each([1, 2, 3, 4])("$s번 쿠폰만 선택하였을 때, 숫자 %s만 담은 Set을 반환한다.", (SELECTED_COUPON_ID) => {
        const snapshot = snapshot_UNSTABLE(({ set }) => set(isSelectedCouponAtomFamily(SELECTED_COUPON_ID), true));
        const COUPON_SET_SELECTED = new Set([mockCouponList[SELECTED_COUPON_ID - 1]]);

        expect(snapshot.getLoadable(selectedCouponSetSelector).contents).toEqual(COUPON_SET_SELECTED);
      });
    });
  });

  describe("couponDiscountPriceSelectorFamily", () => {
    describe("쿠폰이 인자로 들어왔을 때, 그에맞게 할인금액을 반환한다.", () => {
      it("고정금액 할인쿠폰이 인자로 들어왔을 때, 해당 고정금액 5000원을 반환한다", () => {
        const snapshot = snapshot_UNSTABLE();
        const FIXED_COUPON_INDEX = 0;
        const coupon = mockCouponList[FIXED_COUPON_INDEX] as Coupon & FixedDiscount;

        expect(snapshot.getLoadable(couponDiscountPriceSelectorFamily(coupon.id)).getValue()).toBe(coupon.discount);
      });
      it("BuyXGetY 할인쿠폰이 인자로 들어왔을 때, 해당 하는 할인 금액을 반환한다", () => {
        const snapshot = snapshot_UNSTABLE();
        const BOGO_COUPON_INDEX = 1;
        const EXPECTED_DISCOUNT = 25000;
        const coupon = mockCouponList[BOGO_COUPON_INDEX] as Coupon & FixedDiscount;

        expect(snapshot.getLoadable(couponDiscountPriceSelectorFamily(coupon.id)).getValue()).toBe(EXPECTED_DISCOUNT);
      });
      it("무료배송 할인쿠폰이 인자로 들어왔을 때, 해당 고정금액 5000원을 반환한다", () => {
        const snapshot = snapshot_UNSTABLE();
        const BOGO_COUPON_INDEX = 2;
        const EXPECTED_DISCOUNT = 3000;
        const coupon = mockCouponList[BOGO_COUPON_INDEX] as Coupon & FixedDiscount;

        expect(snapshot.getLoadable(couponDiscountPriceSelectorFamily(coupon.id)).getValue()).toBe(EXPECTED_DISCOUNT);
      });
      it("MIRACLESALE 할인쿠폰이 인자로 들어왔을 때, 해당 고정금액 5000원을 반환한다", () => {
        const snapshot = snapshot_UNSTABLE(({ set }) => {
          set(checkedIdSetSelector, new Set([1, 2]));
        });
        const MIRACLESALE_COUPON_INDEX = 3;
        const EXPECTED_ORDER_PRICE = 145000;
        const EXPECTED_DISCOUNT = EXPECTED_ORDER_PRICE * 0.3;
        const coupon = mockCouponList[MIRACLESALE_COUPON_INDEX] as Coupon & FixedDiscount;

        expect(snapshot.getLoadable(couponDiscountPriceSelectorFamily(coupon.id)).getValue()).toBe(EXPECTED_DISCOUNT);
      });
    });
  });
});
