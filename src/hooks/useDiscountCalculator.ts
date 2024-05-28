import { useRecoilValue } from "recoil";

import { cartItems } from "@/recoil/cartItems";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";
import { selectedCartItemsQuantitySelector } from "@/recoil/selectedCardItems";
import { shippingFeeSelector } from "@/recoil/shippingFee";

import { Coupon } from "@/types/cart";
import calculateDiscountAmount from "@/domains/calculateDiscountAmount";

const useDiscountCalculator = () => {
  const cartItemsState = useRecoilValue(cartItems);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);
  const selectedCartItemsQuantity = useRecoilValue(
    selectedCartItemsQuantitySelector
  );
  const shippingFee = useRecoilValue(shippingFeeSelector);

  const getDiscountAmount = (coupon: Coupon) => {
    return calculateDiscountAmount(
      coupon,
      totalOrderPrice,
      cartItemsState,
      selectedCartItemsQuantity,
      shippingFee
    );
  };

  return {
    getDiscountAmount,
  };
};

export default useDiscountCalculator;
