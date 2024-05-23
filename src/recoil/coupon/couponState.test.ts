import { selector } from "recoil";
import { fetchCouponList } from "../../api/coupon";
import { mockCouponList } from "../mocks";

export const fetchCouponListSelector = selector({
  key: "fetchCouponListSelector",
  get: fetchCouponList,
});

jest.mock("../api/coupon", () => ({
  fetchCouponList: () => mockCouponList,
}));
describe("couponState 테스트", () => {
  it("");
});
