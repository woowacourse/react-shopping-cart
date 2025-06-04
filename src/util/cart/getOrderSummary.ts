import { getSelectedCartItems } from "./getSelectedCartItems";
import { calculateTotalPrice } from "./calculateTotalPrice";
import { calculateShippingFee } from "./calculateShippingFee";
import { calculateTotalPriceWithShipping } from "./calculateTotalPriceWithShipping";
import { CartItem } from "../../type/CartItem";
import { getSelectedCartItemsLength } from "./getSelectedCartItemsLength";
import { getSelectedCartItemsCount } from "./getSelectedCartItemsCount";

export function getOrderSummary({
  cartItemsData,
  selectedCartIds,
}: {
  cartItemsData: CartItem[];
  selectedCartIds: number[];
}) {
  const selectedCartItems = getSelectedCartItems({
    cartItemsData,
    selectedCartIds,
  });
  const totalPrice = calculateTotalPrice(selectedCartItems);

  const shippingFee = calculateShippingFee(totalPrice);
  const totalPriceWithShipping = calculateTotalPriceWithShipping({
    totalPrice,
    shippingFee,
  });

  const selectedCartItemsLength = getSelectedCartItemsLength(selectedCartItems);

  const selectedCartItemsCount = getSelectedCartItemsCount(selectedCartItems);

  return {
    selectedCartItemsLength,
    selectedCartItemsCount,
    totalPrice,
    shippingFee,
    totalPriceWithShipping,
  };
}
