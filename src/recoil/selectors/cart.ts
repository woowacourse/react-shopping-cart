import { selector } from "recoil";
import { selectedListState, cartItemsState, couponsState } from "../atoms/cart";

import { isInTimeRange, isValidDate } from "../../utils/date";
import { deliveryPriceState, orderPriceState } from "./price";

export const possibleCouponListState = selector({
  key: "possibleCouponListState",
  get: ({ get }) => {
    /* 
      공통 유효성 기준
      현재 날짜가 expirationDate 보다 이전이여야 함  

      타입별 쿠폰 유효성 기준  
      fixed: 구매가격이 minimumAmount 이상 
      buyXgetY: 품목 중 가장 높은 품목기준으로 buyQuantity개 구입시 getQuantity개 만큼 증정, 즉 구입 갯수가 buyQuantity+getQuantity 이상인 물품이 있어야 한다
      freeShipping: 배송비가 존재할 경우 일정 금액 이상 주문시 배송비 무료 
      percentage: 현재 시간이 availableTime 안에 있는 경우
    
    */

    const coupons = get(couponsState);
    const selectedCartItems = get(selectedCartItemsState);
    const orderPrice = get(orderPriceState);
    const deliveryPrice = get(deliveryPriceState);

    return coupons
      .filter((coupon) => {
        if (!isValidDate(coupon.expirationDate)) return false;

        switch (coupon.discountType) {
          case "fixed":
            return coupon.minimumAmount && orderPrice >= coupon.minimumAmount;

          case "buyXgetY":
            return selectedCartItems.some(
              (item) =>
                coupon.buyQuantity &&
                coupon.getQuantity &&
                item.quantity >= coupon.buyQuantity + coupon.getQuantity
            );

          case "freeShipping":
            return deliveryPrice && coupon.minimumAmount && orderPrice >= coupon.minimumAmount;

          case "percentage":
            return (
              coupon.availableTime?.start &&
              coupon.availableTime?.end &&
              isInTimeRange(coupon.availableTime.start, coupon.availableTime.end)
            );

          default:
            return false;
        }
      })
      .map((coupon) => coupon.id);
  },
});

export const selectedCartItemsState = selector({
  key: "selectedCartItemsState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedList = get(selectedListState);
    return cartItems.filter((cartItem) => selectedList.includes(cartItem.id));
  },
});

export const cartSummaryState = selector({
  key: "cartSummaryState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartItems = get(selectedCartItemsState);
    const cartItemKind = cartItems.length;

    const cartItemSelectedKind = selectedCartItems.length;
    const cartItemSelectedQuantity = selectedCartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );

    return { cartItemKind, cartItemSelectedQuantity, cartItemSelectedKind };
  },
});
