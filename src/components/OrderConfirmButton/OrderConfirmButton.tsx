import Button from "../_common/Button/Button";

import Styled from "./OrderConfirmButton.style";

interface OrderConfirmButtonProps {
  onClick?: () => void;
  disabled: boolean;
}

const OrderConfirmButton = ({ ...props }: OrderConfirmButtonProps) => {
  return (
    <Styled.OrderConfirmButton>
      <Button width="full" size="xLarge" theme="dark" {...props}>
        <Styled.ButtonText>주문 확인</Styled.ButtonText>
      </Button>
    </Styled.OrderConfirmButton>
  );
};

export default OrderConfirmButton;
