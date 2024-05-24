import { snapshot_UNSTABLE } from "recoil";
import { mockCouponList } from "../mocks";
import { couponSelectorFamily } from "./couponState";

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
});
