import CartItemCheck from "../types/CartItemCheck";
import { calculateCouponDiscounts } from "../utils/calculateCouponDiscounts";
import useLocalStorage from "./useLocalStorage";

export const useReceipt = () => {
  const [selectedItems] = useLocalStorage<CartItemCheck[]>(
    "selectedCartItems",
    []
  );
  const [isRemote, setIsRemote] = useLocalStorage<boolean>("isRemote", false);

  const cartItemCheckListTotalQuantity = selectedItems
    .filter((item) => item.isClicked)
    .reduce((acc, item) => acc + item.quantity, 0);

  const allProductPrice = selectedItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const baseShippingFee = allProductPrice >= 100_000 ? 0 : 3_000;
  const shippingFee = baseShippingFee + (isRemote ? 3_000 : 0);

  const calculateDiscounts = (checkedCoupons: number[]) => {
    return calculateCouponDiscounts(
      checkedCoupons,
      allProductPrice,
      selectedItems.map((ci) => ({
        id: ci.product.id,
        product: ci.product,
        quantity: ci.quantity,
      })),
      shippingFee
    );
  };

  return {
    selectedItems,
    isRemote,
    setIsRemote,
    cartItemCheckListTotalQuantity,
    allProductPrice,
    shippingFee,
    calculateDiscounts,
  };
};
