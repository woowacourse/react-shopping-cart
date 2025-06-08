import { useMemo } from "react";
import { Cart } from "../../api/cart";
import {
  FREE_SHIPPING_STANDARD,
  ISLAND_SHIPPING_FEE,
  SHIPPING_FEE,
} from "./OrderConstants";

export function useOrderCalculation(
  cartListData: Cart[] | undefined,
  selectedCartItems: Cart[],
  isIsland?: boolean,
  discount: number = 0
) {
  return useMemo(() => {
    const typeCount = selectedCartItems.length;
    const totalCount = selectedCartItems.reduce((acc, cart) => acc + cart.quantity, 0);
    const totalCartPrice = selectedCartItems.reduce(
      (acc, cart) => acc + cart.product.price * cart.quantity,
      0
    );
    const shippingFee =
      (totalCartPrice >= FREE_SHIPPING_STANDARD || totalCartPrice === 0
        ? 0
        : SHIPPING_FEE) + (isIsland ? ISLAND_SHIPPING_FEE : 0);
    const totalPrice = totalCartPrice + shippingFee - discount;

    return {
      typeCount,
      totalCount,
      totalCartPrice,
      shippingFee,
      totalPrice,
    };
  }, [cartListData, selectedCartItems, isIsland, discount]);
}
