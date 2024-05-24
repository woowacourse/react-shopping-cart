import { FREE_SHIPPING_THRESHOLD, ShippingFeeType } from "@/constants/cart";
import {
  shippingFeeTypeState,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const useCalculateShippingFee = () => {
  const [shippingFeeType, setShippingFeeType] =
    useRecoilState<ShippingFeeType>(shippingFeeTypeState);

  const selectedCartItems = useRecoilValue(selectedCartItemsIdState);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

  const calculateShippingFee = useCallback(() => {
    const checkFreeShipping =
      selectedCartItems.length > 0 &&
      totalOrderPrice >= FREE_SHIPPING_THRESHOLD;

    const isFreeShipping = checkFreeShipping;

    if (isFreeShipping) return setShippingFeeType("free");
    if (shippingFeeType === "free") return setShippingFeeType("basic");
    setShippingFeeType(shippingFeeType);
  }, [setShippingFeeType, totalOrderPrice, shippingFeeType, selectedCartItems]);

  useEffect(() => {
    calculateShippingFee();
  }, [calculateShippingFee, shippingFeeType, selectedCartItems]);

  return {
    shippingFeeType,
    calculateShippingFee,
    setShippingFeeType,
  };
};

export default useCalculateShippingFee;
