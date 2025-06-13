import usePaymentConfirm from "../../../hooks/orderConfirmation/usePaymentConfirm";
import { CartItem } from "../../../type/CartItem";

import * as Styled from "./PaymentConfirmButton.style";

interface PaymentConfirmButtonProps {
  selectedCartItems: CartItem[];
  discountAmount: number;
  isRemoteAreaShipping: boolean;
}

function PaymentConfirmButton({
  selectedCartItems,
  discountAmount,
  isRemoteAreaShipping,
}: PaymentConfirmButtonProps) {
  const { handlePaymentConfirm } = usePaymentConfirm({
    selectedCartItems,
    discountAmount,
    isRemoteAreaShipping,
  });

  return (
    <Styled.PaymentConfirmButton
      disabled={selectedCartItems.length === 0}
      onClick={handlePaymentConfirm}
      type="button"
      aria-label="결제하기"
    >
      결제하기
    </Styled.PaymentConfirmButton>
  );
}

export default PaymentConfirmButton;
