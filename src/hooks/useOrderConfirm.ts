import { useNavigate } from "react-router";
import { PAGE_URL } from "../constants/PageUrl";
import type { OrderConfirmationLocationState } from "../type/OrderConfirmation";
import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "../constants/priceSetting";
import { CartItem } from "../type/CartItem";
import { useCallback } from "react";

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
    const selectedCartItems = cartItemsData.filter((cartItem) =>
      selectedCartIds.includes(cartItem.id)
    );
    const totalPrice = selectedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const shippingFee = totalPrice >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
    const totalPriceWithShipping = totalPrice + shippingFee;

    const state: OrderConfirmationLocationState = {
      selectedCartItemsLength: selectedCartIds.length,
      selectedCartItemsCount: selectedCartItems.reduce(
        (totalCount, item) => totalCount + item.quantity,
        0
      ),
      totalPrice: totalPriceWithShipping,
    };
    navigate(PAGE_URL.ORDER_CONFIRMATION, { state });
  }, [cartItemsData, navigate, selectedCartIds]);

  return {
    handleOrderConfirm,
  };
};

export default useOrderConfirm;
