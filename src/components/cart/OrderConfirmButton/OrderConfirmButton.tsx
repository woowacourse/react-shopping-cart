import Button from "../../_common/Button/Button.tsx";
import * as S from "./OrderConfirmButton.style.ts";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url.ts";
import { CAPTION } from "@/constants/titleAndCaption.ts";

const OrderConfirmButton = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();
  const onMoveOrderConfirmPage = () => {
    navigate(PAGE_URL.orderConfirm);
  };

  return (
    <S.OrderConfirmButton onClick={onMoveOrderConfirmPage}>
      <Button width="full" size="large" theme="dark" disabled={disabled}>
        <S.ButtonText>{CAPTION.orderConfirm}</S.ButtonText>
      </Button>
    </S.OrderConfirmButton>
  );
};

export default OrderConfirmButton;
