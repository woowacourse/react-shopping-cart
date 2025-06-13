import * as S from "./OrderConfirmButton.styled";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { CartItemType } from "@/apis/cartItems/cartItem.type";

type OrderConfirmButton = {
  orderList: CartItemType[];
  orderTotalPrice: number;
};

export default function OrderConfirmButton({
  orderList,
  orderTotalPrice,
}: OrderConfirmButton) {
  const navigate = useNavigate();
  const handleOrderConfirmButtonClick = () => {
    navigate(ROUTES.PAYMENT_SUCCESS, {
      state: {
        orderList,
        orderTotalPrice,
      },
    });
  };

  return (
    <S.OrderConfirmButton
      type="button"
      onClick={handleOrderConfirmButtonClick}
      disabled={!orderList.length}
    >
      주문 확인
    </S.OrderConfirmButton>
  );
}
