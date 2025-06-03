import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { getDeliveryPrice } from "@/domains/utils/getDeliveryPrice";
import BottomFixedButton from "@/shared/components/BottomFixedButton/BottomFixedButton";

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
    navigate(ROUTES.ORDER_CONFIRM, {
      state: {
        orderList,
        paymentPrice: orderTotalPrice + getDeliveryPrice(orderTotalPrice),
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
