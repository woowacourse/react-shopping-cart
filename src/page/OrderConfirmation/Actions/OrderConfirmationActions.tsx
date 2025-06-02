import { CartItem } from "@/type/CartItem";
import * as Styled from "./OrderConfirmationActions.style";
import { useNavigate } from "react-router";

import { PAGE_URL } from "@/constants/PageUrl";

interface OrderConfirmationActionsProps {
  selectedCartItems: CartItem[];
}

export default function OrderConfirmationActions({
  selectedCartItems,
}: OrderConfirmationActionsProps) {
  const navigate = useNavigate();

  const handleOrderConfirm = () => {
    navigate(PAGE_URL.ORDER_COMPLETE, {
      state: {
        selectedCartItemsLength: selectedCartItems.length,
        selectedCartItemsCount: selectedCartItems.length,
        finalPrice: selectedCartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        ),
      },
    });
  };

  return (
    <Styled.OrderConfirmButton
      disabled={selectedCartItems.length === 0}
      onClick={handleOrderConfirm}
    >
      결제하기
    </Styled.OrderConfirmButton>
  );
}
