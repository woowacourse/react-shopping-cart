import { snapshot_UNSTABLE } from "recoil";
import { mockCartItems, mockCouponList } from "../mocks";
import { validCouponSelectedSetSelector } from "./validateCouponState";
import { checkedIdSetSelector } from "../cart/checkedState";

jest.mock("../../api/coupon", () => ({ fetchCouponList: () => mockCouponList }));
jest.mock("../../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));

describe("validateCouponState 테스트", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-20"));
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe("validCouponSelectedSetSelector", () => {
    it("get 했을 때, 선택된 쿠폰 중 적용가능한 쿠폰만 반환한다.", () => {
      const EXPECTED_COUPON_IDS_RESULT = new Set([mockCouponList[2]]);
      const SELECTED_CART_ITEMS_FOR_HIGH_PRICE = new Set([1]);

      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, SELECTED_CART_ITEMS_FOR_HIGH_PRICE);
      });

      expect(snapshot.getLoadable(validCouponSelectedSetSelector).contents).toEqual(EXPECTED_COUPON_IDS_RESULT);
    });
  });
});
