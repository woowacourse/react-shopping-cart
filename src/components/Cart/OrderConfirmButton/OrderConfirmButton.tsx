import useOrderConfirm from "../../../hooks/useOrderConfirm";
import { CartItem } from "../../../type/CartItem";

import * as Styled from "./OrderConfirmButton.style";

interface OrderConfirmButtonProps {
  selectedCartItems: CartItem[];
}

function OrderConfirmButton({ selectedCartItems }: OrderConfirmButtonProps) {
  const { handleOrderConfirm } = useOrderConfirm({
    selectedCartItems,
  });

  return (
    <Styled.OrderConfirmButton
      disabled={selectedCartItems.length === 0}
      onClick={handleOrderConfirm}
      type="button"
      aria-label="주문 확인"
    >
      주문 확인
    </Styled.OrderConfirmButton>
  );
}

export default OrderConfirmButton;
