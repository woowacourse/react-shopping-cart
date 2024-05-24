import { snapshot_UNSTABLE } from "recoil";
import { mockCouponList } from "../mocks";
import {
  couponIdSetSelector,
  couponSelectorFamily,
  isSelectedCouponAtomFamily,
  selectedCouponIdSetSelector,
} from "./couponState";

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

      expect(snapshot.getLoadable(selectedCouponIdSetSelector).contents).toEqual(new Set());
    });
    describe("하나의 쿠폰만 선택된 상태일 때, 해당 id만 담은 Set을 반환한다.", () => {
      it.each([1, 2, 3, 4])("$s번 쿠폰만 선택하였을 때, 숫자 %s만 담은 Set을 반환한다.", (SELECTED_COUPON_ID) => {
        const snapshot = snapshot_UNSTABLE(({ set }) => set(isSelectedCouponAtomFamily(SELECTED_COUPON_ID), true));

        expect(snapshot.getLoadable(selectedCouponIdSetSelector).contents).toEqual(new Set([SELECTED_COUPON_ID]));
      });
    });
  });
});
