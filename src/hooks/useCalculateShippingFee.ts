import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/constants/cart";
import {
  shippingFeeState,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const useCalculateShippingFee = () => {
  const [shippingFee, setShippingFee] = useRecoilState(shippingFeeState);

  const [shippingFeeType, setShippingFeeType] =
    useState<keyof typeof SHIPPING_FEE>("BASIC");

  const selectedCartItems = useRecoilValue(selectedCartItemsIdState);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

  const calculateShippingFee = useCallback(() => {
    setShippingFeeType(shippingFeeType);

    const hasSelectedItems = selectedCartItems.length > 0;

    const isFreeShipping =
      hasSelectedItems && totalOrderPrice >= FREE_SHIPPING_THRESHOLD;

    const fee = isFreeShipping ? 0 : SHIPPING_FEE[shippingFeeType];
    setShippingFee(fee);
  }, [selectedCartItems, totalOrderPrice, setShippingFee, shippingFeeType]);

  useEffect(() => {
    calculateShippingFee();
  }, [selectedCartItems, calculateShippingFee, shippingFeeType]);

  return { shippingFee, shippingFeeType, setShippingFeeType };
};

export default useCalculateShippingFee;
