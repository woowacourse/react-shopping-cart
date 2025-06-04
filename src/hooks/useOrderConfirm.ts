import { useNavigate } from "react-router";
import { PAGE_URL } from "../constants/PageUrl";
import type { OrderConfirmationLocationState } from "../type/OrderConfirmation";
import { CartItem } from "../type/CartItem";
import { useCallback } from "react";
import { getOrderSummary } from "../util/cart/getOrderSummary";

interface UseOrderConfirmParams {
  cartItemsData: CartItem[];
  selectedCartIds: number[];
}

const useOrderConfirm = ({
  cartItemsData,
  selectedCartIds,
}: UseOrderConfirmParams) => {
  const navigate = useNavigate();

  const handleOrderConfirm = useCallback(() => {
    const {
      selectedCartItemsLength,
      selectedCartItemsCount,
      totalPriceWithShipping,
    } = getOrderSummary({
      cartItemsData,
      selectedCartIds,
    });

    const state: OrderConfirmationLocationState = {
      selectedCartItemsLength,
      selectedCartItemsCount,
      totalPrice: totalPriceWithShipping,
    };
    navigate(PAGE_URL.ORDER_CONFIRMATION, { state });
  }, [cartItemsData, navigate, selectedCartIds]);

  return {
    handleOrderConfirm,
  };
};

export default useOrderConfirm;
