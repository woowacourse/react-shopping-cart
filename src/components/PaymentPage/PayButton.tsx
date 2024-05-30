import styled from "styled-components";
import Button from "../common/Button";
import { useCheckoutHandler } from "../../hooks/useCheckoutHandler";

export interface PayButtonProps {
  totalPayAmount: number;
}

export default function PayButton({ totalPayAmount }: PayButtonProps) {
  const { handleCheckout } = useCheckoutHandler();

  const handlePayButtonClick = () => handleCheckout(totalPayAmount);

  return <S.PayButton onClick={handlePayButtonClick}>결제하기</S.PayButton>;
}

const S = {
  PayButton: styled(Button)`
    position: absolute;
    bottom: 0;
    left: 0;
  `,
};
