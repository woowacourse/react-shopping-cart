import { useNavigate } from "react-router";
import { PAGE_URL } from "../constants/PageUrl";
import type { OrderConfirmationLocationState } from "../type/OrderConfirmation";
import { CartItem } from "../type/CartItem";
import { useCallback } from "react";
import { getOrderSummary } from "../util/cart/getOrderSummary";

interface UseOrderConfirmParams {
  selectedCartItems: CartItem[];
}

const useOrderConfirm = ({ selectedCartItems }: UseOrderConfirmParams) => {
  const navigate = useNavigate();

  const handleOrderConfirm = useCallback(() => {
    const {
      selectedCartItemsLength,
      selectedCartItemsCount,
      totalPriceWithShipping,
      totalPrice,
      shippingFee,
    } = getOrderSummary({
      selectedCartItems,
    });

    const state: OrderConfirmationLocationState = {
      selectedCartItemsLength,
      selectedCartItemsCount,
      totalPriceWithShipping,
      selectedCartItemsData: selectedCartItems,
      totalPrice,
      shippingFee,
    };
    navigate(PAGE_URL.ORDER_CONFIRMATION, { state });
  }, [navigate, selectedCartItems]);

  return {
    handleOrderConfirm,
  };
};

export default useOrderConfirm;
