import { CartItemType, FilteredCartItemStateType } from "@/types/cart.type";
import { atom, atomFamily, selectorFamily } from "recoil";

import { CouponType } from "@/types/coupon.type";
import { cartState } from "@/store/selectors/dataFetchSelector/dataFetchSelector";
import localStorageEffect from "@/store/localStorageEffect";

export const cartListState = atom<CartItemType[]>({
  key: "cartListState",
  default: cartState,
});

export const filteredCartItemState = atomFamily<
  FilteredCartItemStateType,
  number
>({
  key: "cartItemState",
  default: selectorFamily({
    key: "cartItemState/Default",
    get:
      (id) =>
      ({ get }) => {
        const cartList = get(cartListState);
        const itemMap: Record<CartItemType["id"], CartItemType> =
          cartList.reduce((accItemMap, curItem) => {
            const key = String([curItem.id]);
            return { ...accItemMap, [key]: curItem };
          }, {});

        const item = itemMap[id];

        if (!item) {
          throw new Error("item does not exist in cartList");
        }

        return {
          id,
          quantity: item.quantity,
          price: item.product.price,
          isSelected: true,
        };
      },
  }),
  effects: (id) => [localStorageEffect(`cartItemState_${id}`)],
});

export const selectedCouponsState = atom<CouponType[]>({
  key: "selectedCouponsState",
  default: [],
});

export const discountAmountState = atom<number>({
  key: "discountAmountState",
  default: 0,
});

export const additionalShippingFeeAreaState = atom<boolean>({
  key: "additionalShippingFeeAreaState",
  default: false,
});
