import { RecoilEnv, selector } from "recoil";
import { cartItemCheckedState, cartItemIdListState, remoteAreaState, selectedCouponsState } from "../atom/atoms";
import { SHIPPING_CONSTANT } from "../../constants";
import { cartState } from "../atom/atoms";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const checkAllItemSelector = selector<boolean>({
  key: "checkAllItemState",
  get: ({ get }) => {
    const itemIds = get(cartItemIdListState);
    return itemIds.every((itemId) => get(cartItemCheckedState(itemId)));
  },
  set: ({ set, get }, newValue) => {
    const itemIds = get(cartItemIdListState);
    itemIds.forEach((itemId) => set(cartItemCheckedState(itemId), newValue));
  },
});

export const orderAmountSelector = selector<number>({
  key: "orderAmount",
  get: ({ get }) => {
    const cartItems = get(cartState);

    return cartItems.reduce((acc: number, cur: CartItemInfo) => {
      const isChecked = get(cartItemCheckedState(cur.id));
      if (isChecked) {
        const price = cur.product.price;
        return acc + price * cur.quantity;
      }
      return acc;
    }, 0);
  },
});

export const shippingFeeSelector = selector<number>({
  key: "shippingFee",
  get: ({ get }) => {
    const orderAmount = get(orderAmountSelector);
    const isRemoteArea = get(remoteAreaState);
    const couponList = get(selectedCouponsState);

    if (couponList.some((coupon) => coupon.discountType === "freeShipping")) {
      return 0;
    }

    if (orderAmount > SHIPPING_CONSTANT.FREE_CRITERIA) {
      return 0;
    }

    if (isRemoteArea) {
      return SHIPPING_CONSTANT.DEFAULT + SHIPPING_CONSTANT.ADDITIONAL;
    }

    return SHIPPING_CONSTANT.DEFAULT;
  },
});

export const totalAmountSelector = selector<number>({
  key: "totalAmount",
  get: ({ get }) => {
    const tempAmount = get(orderAmountSelector);
    return tempAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? tempAmount : tempAmount + SHIPPING_CONSTANT.DEFAULT;
  },
});

export const checkedCartItemsSelector = selector<CartItemInfo[]>({
  key: "checkedCartItems",
  get: ({ get }) => {
    const cartItems = get(cartState);
    return cartItems.filter((item) => get(cartItemCheckedState(item.id)));
  },
});
