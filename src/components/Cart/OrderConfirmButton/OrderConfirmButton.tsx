import { useNavigate } from "react-router";
import { CartItem } from "../../../type/CartItem";
import { PAGE_URL } from "../../../constants/PageUrl";
import type { OrderConfirmationLocationState } from "../../../type/OrderConfirmation";
import {
  FREE_SHIPPING_OVER,
  SHIPPING_FEE,
} from "../../../constants/priceSetting";
import * as Styled from "./OrderConfirmButton.style";

interface OrderConfirmButtonProps {
  selectedCartIds: number[];
  cartItemsData: CartItem[];
}

function OrderConfirmButton({
  selectedCartIds,
  cartItemsData,
}: OrderConfirmButtonProps) {
  const navigate = useNavigate();
  const handleOrderConfirm = () => {
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
  };

  return (
    <Styled.OrderConfirmButton
      disabled={selectedCartIds.length === 0}
      onClick={handleOrderConfirm}
    >
      주문 확인
    </Styled.OrderConfirmButton>
  );
}

export default OrderConfirmButton;
