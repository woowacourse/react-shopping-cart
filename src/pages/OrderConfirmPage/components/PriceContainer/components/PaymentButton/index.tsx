import * as S from "./PaymentButton.styled";
import Button from "../../../../../../components/common/Button";
import { useNavigate } from "react-router";

interface PaymentButtonProps {
  orderItemsKind: number;
  totalOrderItemsCount: number;
  totalPrice: number;
}

const PaymentButton = ({ orderItemsKind, totalOrderItemsCount, totalPrice }: PaymentButtonProps) => {
  const navigate = useNavigate();
  const handleNavigate = () =>
    navigate("/payment-success", {
      state: { orderItemsKind, totalOrderItemsCount, totalPrice },
    });
  return (
    <S.ButtonWrap>
      <Button variant="primary" onClick={handleNavigate}>
        결제하기
      </Button>
    </S.ButtonWrap>
  );
};

export default PaymentButton;
