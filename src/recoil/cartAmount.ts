import { atom, selector } from "recoil";
import { cartItemsState } from "./cart/cartItems";
import { couponsState } from "./coupon/coupons";
import { calculateDiscountAmountOfCoupon } from "../utils/calculateDiscountAmountOfCoupon";

export const orderAmountState = selector({
  key: "orderAmountState",
  get: async ({ get }) => {
    const cartItems = get(cartItemsState);
    const orderAmount = cartItems.reduce(
      (amount, { isSelected, quantity, product }) =>
        isSelected ? amount + quantity * product.price : amount,
      0
    );
    return orderAmount;
  },
});

export const discountAmountState = selector({
  key: "discountAmountState",
  get: ({ get }) => {
    // TODO: BOGO 쿠폰에 필요할 것으로 예상
    // const selectedCartItems = get(cartItemsState).filter(
    //   ({ isSelected }) => isSelected
    // );
    const selectedCoupons = get(couponsState).filter(
      ({ isSelected }) => isSelected
    );
    const orderAmount = get(orderAmountState);

    // 일단 고정 할인만
    // TODO: 다른 쿠폰 케이스도 적용해야함
    return selectedCoupons.reduce(
      (discountAmount, coupon) =>
        discountAmount + calculateDiscountAmountOfCoupon(coupon, orderAmount),
      0
    );
  },
});

export const is도서산간지역State = atom({
  key: "is도서산간지역State",
  default: false,
});

export const deliveryCostState = selector({
  key: "deliveryCostState",
  get: async ({ get }) => {
    const orderAmount = get(orderAmountState);
    const is도서산간지역 = get(is도서산간지역State);

    if (orderAmount >= 100_000) {
      return 0;
    }
    if (is도서산간지역) {
      return 6000;
    }
    return 3000;
  },
});

export const totalOrderAmountState = selector({
  key: "totalOrderAmountState",
  get: ({ get }) => {
    const orderAmount = get(orderAmountState);
    const discountAmount = get(discountAmountState);
    const deliveryCost = get(deliveryCostState);
    return orderAmount - discountAmount + deliveryCost;
  },
});
