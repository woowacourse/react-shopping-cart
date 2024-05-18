import { TITLES } from "@/constants/cart";
import Button from "../_common/Button/Button";
import * as S from "./OrderConfirmButton.style";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";

const OrderConfirmButton = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();
  const onMoveOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  return (
    <S.OrderConfirmButton onClick={onMoveOrderConfirmPage}>
      <Button width="full" size="xLarge" theme="dark" disabled={disabled}>
        <S.ButtonText>{TITLES.orderConfirm}</S.ButtonText>
      </Button>
    </S.OrderConfirmButton>
  );
};

export default OrderConfirmButton;
