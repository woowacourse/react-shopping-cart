import * as S from "./PaymentButton.styled";
import Button from "../../../../../../components/common/Button";
import { useNavigate } from "react-router";
import { OrderItem } from "../../../../types";

const PaymentButton = ({ orderItems }: { orderItems: OrderItem[] }) => {
  const navigate = useNavigate();
  const handleNavigate = () =>
    navigate("/payment-success", {
      state: {
        orderItemsKind: orderItems.length,
        totalOrderItemsCount: orderItems.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: 0,
      },
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
