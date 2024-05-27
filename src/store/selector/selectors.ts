import { selector } from "recoil";
import {
  couponEachCheckState,
  couponsState,
  isExtraShippingFeeState,
  itemEachCheckState,
  itemQuantityState,
} from "@/store/atom/atoms";
import { SHIPPING_CONSTANT } from "@/constants";
import { cartState } from "@/store/atom/atoms";
import { fetchCartItemsCounts } from "../../api";

export const orderAmountState = selector({
  key: "orderAmount",
  get: ({ get }) => {
    const cartItems = get(cartState);
    if (!cartItems) return 0;
    return cartItems.reduce((acc: number, cur: CartItemInfo) => {
      const isChecked = get(itemEachCheckState(cur.id));
      if (isChecked) {
        const quantity = get(itemQuantityState);
        const price = cur.product.price;
        return acc + price * quantity[cur.id];
      }
      return acc;
    }, 0);
  },
});

export const totalAmountState = selector({
  key: "totalAmount",
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const isExtraShippingFee = get(isExtraShippingFeeState);

    const totalShipFee = SHIPPING_CONSTANT.FEE + (isExtraShippingFee ? SHIPPING_CONSTANT.EXTRA_FEE : 0);
    const totalAmount = orderAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? orderAmount : orderAmount + totalShipFee;
    return totalAmount;
  },
});

export const cartItemsCounts = selector({
  key: "cartItemsCounts",
  get: async () => {
    const counts = await fetchCartItemsCounts();
    return counts;
  },
});

export const isOver2CouponsCheckedState = selector({
  key: "isOver2CouponsChecked",
  get: ({ get }) => {
    const couponIds = get(couponsState).map((c) => c.id);

    let checkedCount = 0;
    let index = 0;

    while (checkedCount < 2 && index < couponIds.length) {
      const curId = couponIds[index];
      const isChecked = get(couponEachCheckState(curId));
      if (isChecked) checkedCount += 1;
      index += 1;
    }

    return checkedCount === 2;
  },
});

export const checkedItemList = selector({
  key: "checkedItemList",
  get: ({ get }) => {
    return get(cartState).filter((cartItem) => {
      return get(itemEachCheckState(cartItem.id));
    });
  },
});

export const checkedCouponList = selector({
  key: "checkedCouponList",
  get: ({ get }) => {
    const allCoupons = get(couponsState);
    return allCoupons.filter((coupon) => get(couponEachCheckState(coupon.id)));
  },
});
