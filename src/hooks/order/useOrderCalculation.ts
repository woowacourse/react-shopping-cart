import { useMemo } from "react";
import { Cart } from "../../api/cart";
import { FREE_SHIPPING_STANDARD, SHIPPING_FEE } from "./OrderConstants";

export function useOrderCalculation(
  cartListData: Cart[] | undefined,
  selectionMap: Record<string, boolean>
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
      totalCartPrice >= FREE_SHIPPING_STANDARD || totalCartPrice === 0
        ? 0
        : SHIPPING_FEE;
    const totalPrice = totalCartPrice + shippingFee;

    return {
      typeCount,
      totalCount,
      totalCartPrice,
      shippingFee,
      totalPrice,
    };
  }, [cartListData, selectionMap]);
}
