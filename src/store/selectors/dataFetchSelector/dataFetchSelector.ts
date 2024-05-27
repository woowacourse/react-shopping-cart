import { getCartList } from "@/api/cartItem";
import { getCouponList } from "@/api/coupons";
import { isValidExpirationDate } from "@/utils/isValidCoupon";
import { selector } from "recoil";

export const cartState = selector({
  key: "cartState",
  get: async () => {
    const cart = await getCartList();
    return cart;
  },
});

export const couponState = selector({
  key: "couponState",
  get: async () => {
    const coupons = await getCouponList();

    const validCoupons = coupons.filter((coupon) =>
      isValidExpirationDate(coupon.expirationDate)
    );

    return validCoupons;
  },
});
