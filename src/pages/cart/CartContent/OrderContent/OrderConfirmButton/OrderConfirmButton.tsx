import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import BottomFixedButton from "@/shared/components/BottomFixedButton/BottomFixedButton";

type OrderConfirmButtonProps = {
  orderList: CartItemType[];
  paymentPrice: number;
};

export default function OrderConfirmButton({
  orderList,
  paymentPrice,
}: OrderConfirmButtonProps) {
  const navigate = useNavigate();
  const handleOrderConfirmButtonClick = () => {
    navigate(ROUTES.ORDER_CONFIRM, {
      state: {
        orderList,
        paymentPrice,
      },
    });
  };

  return (
    <BottomFixedButton
      type="button"
      onClick={handleOrderConfirmButtonClick}
      disabled={!orderList.length}
    >
      주문 확인
    </BottomFixedButton>
  );
}
