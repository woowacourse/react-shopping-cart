import { useMemo } from "react";
import { Cart } from "../../api/cart";
import { Coupon } from "../../api/coupon";
import {
  FREE_SHIPPING_STANDARD,
  ISLAND_SHIPPING_FEE,
  SHIPPING_FEE,
} from "./OrderConstants";

export function useOrderCalculation(
  selectedCartItems: Cart[],
  isIsland?: boolean,
  selectedCoupons: Coupon[] = []
) {
  return useMemo(() => {
    const typeCount = selectedCartItems.length;
    const totalCount = selectedCartItems.reduce(
      (acc, cart) => acc + cart.quantity,
      0
    );
    const totalCartPrice = selectedCartItems.reduce(
      (acc, cart) => acc + cart.product.price * cart.quantity,
      0
    );

    let totalDiscount = 0;
    let hasFreeShipping = false;

    selectedCoupons.forEach((coupon) => {
      switch (coupon.discountType) {
        case "fixed":
          if (totalCartPrice >= coupon.minimumAmount) {
            totalDiscount += coupon.discount;
          }
          break;

        case "percentage":
          totalDiscount += totalCartPrice * (coupon.discount / 100);
          break;

        case "buyXgetY":
          if (selectedCartItems.length > 0) {
            const eligibleItems = selectedCartItems.filter(
              (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
            );
            if (eligibleItems.length > 0) {
              const highestPriceItem = eligibleItems.reduce((prev, current) =>
                prev.product.price > current.product.price ? prev : current
              );
              const freeQuantity = Math.floor(highestPriceItem.quantity / 2);
              totalDiscount += highestPriceItem.product.price * freeQuantity;
            }
          }
          break;

        case "freeShipping":
          if (totalCartPrice >= coupon.minimumAmount) {
            hasFreeShipping = true;
          }
          break;
      }
    });

    // 기본 배송비 계산 (무료 배송 기준 금액 체크)
    const baseShippingFee = totalCartPrice >= FREE_SHIPPING_STANDARD || totalCartPrice === 0
      ? 0
      : SHIPPING_FEE;

    // 제주/도서산간 추가 배송비
    const additionalShippingFee = isIsland ? ISLAND_SHIPPING_FEE : 0;

    // 최종 배송비
    const shippingFee = baseShippingFee + additionalShippingFee;

    // 무료 배송 쿠폰이 적용된 경우 배송비를 할인에 추가
    const finalDiscount = totalDiscount + (hasFreeShipping ? shippingFee : 0);

    // 최종 결제 금액 = 상품 금액 + 배송비 - 할인 금액
    const totalPrice = totalCartPrice + shippingFee - finalDiscount;

    return {
      typeCount,
      totalCount,
      totalCartPrice,
      shippingFee,
      totalPrice,
      finalDiscount,
    };
  }, [selectedCartItems, isIsland, selectedCoupons]);
}
