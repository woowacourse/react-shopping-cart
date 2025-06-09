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
              (item) =>
                item.quantity >= coupon.buyQuantity &&
                item.quantity >= coupon.buyQuantity + coupon.getQuantity
            );
            if (eligibleItems.length > 0) {
              const highestPriceItem = eligibleItems.reduce((prev, current) =>
                prev.product.price > current.product.price ? prev : current
              );
              const freeQuantity =
                Math.floor(
                  highestPriceItem.quantity /
                    (coupon.buyQuantity + coupon.getQuantity)
                ) * coupon.getQuantity;
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

    const baseShippingFee =
      totalCartPrice >= FREE_SHIPPING_STANDARD || totalCartPrice === 0
        ? 0
        : SHIPPING_FEE;

    const additionalShippingFee = isIsland ? ISLAND_SHIPPING_FEE : 0;

    const shippingFee = baseShippingFee + additionalShippingFee;

    const finalDiscount = totalDiscount + (hasFreeShipping ? shippingFee : 0);

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
