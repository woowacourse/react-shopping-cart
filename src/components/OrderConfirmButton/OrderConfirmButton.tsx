import Button from "../_common/Button/Button";
import * as S from "./OrderConfirmButton.style";

const OrderConfirmButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <S.OrderConfirmButton>
      <Button width="full" size="xLarge" theme="dark" disabled={disabled}>
        <S.ButtonText>주문 확인</S.ButtonText>
      </Button>
    </S.OrderConfirmButton>
  );
};

export default OrderConfirmButton;
