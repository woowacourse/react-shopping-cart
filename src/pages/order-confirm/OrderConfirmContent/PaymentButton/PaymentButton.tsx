import { CartItemType } from "@/apis/cartItems/cartItem.type";
import BottomFixedButton from "@/shared/components/BottomFixedButton/BottomFixedButton";
import { ROUTES } from "@/shared/config/routes";
import { useNavigate } from "react-router-dom";

type PaymentButtonProps = {
  orderList: CartItemType[];
  paymentPrice: number;
};

export default function PaymentButton({
  orderList,
  paymentPrice,
}: PaymentButtonProps) {
  const navigate = useNavigate();
  const handlePaymentButtonClick = () => {
    navigate(ROUTES.PAYMENT_SUCCESS, {
      state: {
        orderList,
        paymentPrice,
      },
    });
  };

  return (
    <BottomFixedButton type="button" onClick={handlePaymentButtonClick}>
      결제하기
    </BottomFixedButton>
  );
}
