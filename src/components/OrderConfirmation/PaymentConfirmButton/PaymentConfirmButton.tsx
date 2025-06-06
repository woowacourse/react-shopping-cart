import { CartItem } from "../../../type/CartItem";

import * as Styled from "./PaymentConfirmButton.style";

interface PaymentConfirmButtonProps {
  selectedCartIds: number[];
  cartItemsData: CartItem[];
}

function PaymentConfirmButton({
  selectedCartIds,
  cartItemsData,
}: PaymentConfirmButtonProps) {
  return (
    <Styled.PaymentConfirmButton
      disabled={selectedCartIds.length === 0}
      onClick={() => {}}
      type="button"
      aria-label="결제하기"
    >
      결제하기
    </Styled.PaymentConfirmButton>
  );
}

export default PaymentConfirmButton;
