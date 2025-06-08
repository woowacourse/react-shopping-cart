import { useNavigate } from "react-router";
import { CartItem } from "../type/CartItem";
import { getOrderSummaryWithCoupon } from "../util/cart/getOrderSummaryWithCoupon";
import { useCallback } from "react";
import { OrderConfirmationLocationState } from "../type/OrderConfirmation";
import { PAGE_URL } from "../constants/PageUrl";

interface UsePaymentConfirmParams {
  selectedCartItems: CartItem[];
  discountAmount: number;
  isRemoteAreaShipping: boolean;
}
const usePaymentConfirm = ({
  selectedCartItems,
  discountAmount,
  isRemoteAreaShipping,
}: UsePaymentConfirmParams) => {
  const navigate = useNavigate();

  const handlePaymentConfirm = useCallback(() => {
    const {
      selectedCartItemsLength,
      selectedCartItemsCount,
      totalPriceWithShipping,
      totalPrice,
      shippingFee,
    } = getOrderSummaryWithCoupon({
      selectedCartItems,
      discountAmount,
      isRemoteAreaShipping,
    });

    const state: OrderConfirmationLocationState = {
      selectedCartItemsLength,
      selectedCartItemsCount,
      totalPriceWithShipping,
      selectedCartItemsData: selectedCartItems,
      totalPrice,
      shippingFee,
    };

    navigate(PAGE_URL.PAYMENT_CONFIRMATION, { state });
  }, [discountAmount, isRemoteAreaShipping, navigate, selectedCartItems]);

  return {
    handlePaymentConfirm,
  };
};

export default usePaymentConfirm;
