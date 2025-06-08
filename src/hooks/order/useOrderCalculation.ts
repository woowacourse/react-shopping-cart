import { useMemo } from "react";
import { Cart } from "../../api/cart";
import {
  FREE_SHIPPING_STANDARD,
  ISLAND_SHIPPING_FEE,
  SHIPPING_FEE,
} from "./OrderConstants";

export function useOrderCalculation(
  cartListData: Cart[] | undefined,
  selectionMap: Record<string, boolean>,
  isIsland?: boolean,
  discount: number = 0
) {
  return useMemo(() => {
    const orderList = (cartListData ?? []).filter(
      (cart) => selectionMap[cart.id]
    );
    const typeCount = orderList.length;
    const totalCount = orderList.reduce((acc, cart) => acc + cart.quantity, 0);
    const totalCartPrice = orderList.reduce(
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
  }, [cartListData, selectionMap, isIsland, discount]);
}
