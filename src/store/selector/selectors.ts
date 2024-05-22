import { selector } from "recoil";
import { couponEachCheckState, couponsState, itemEachCheckState, itemQuantityState } from "@/store/atom/atoms";
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
        const price = cur.product.price;
        const quantity = get(itemQuantityState);
        return acc + price * quantity[cur.id];
      }
      return acc;
    }, 0);
  },
});

export const totalAmountState = selector({
  key: "totalAmount",
  get: ({ get }) => {
    const tempAmount = get(orderAmountState);
    return tempAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? tempAmount : tempAmount + SHIPPING_CONSTANT.FEE;
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
