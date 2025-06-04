import { CartItem } from "@/type/CartItem";
import * as Styled from "./OrderConfirmationActions.style";
import { useNavigate } from "react-router";

import { PAGE_URL } from "@/constants/PageUrl";

interface OrderConfirmationActionsProps {
  selectedCartItems: CartItem[];
  finalPrice: number;
}

export default function OrderConfirmationActions({
  selectedCartItems,
  finalPrice,
}: OrderConfirmationActionsProps) {
  const navigate = useNavigate();

  const handleOrderConfirm = () => {
    navigate(PAGE_URL.ORDER_COMPLETE, {
      state: {
        selectedCartItems: selectedCartItems,
        finalPrice,
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
