import { CartItemType } from "@/apis/cartItems/cartItem.type";
import BottomFixedButton from "@/shared/components/BottomFixedButton/BottomFixedButton";
import { ROUTES } from "@/shared/config/routes";
import { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";

type PaymentButtonProps = {
  orderList: CartItemType[];
  paymentPrice: number;
} & ComponentProps<"button">;

export default function PaymentButton({
  orderList,
  paymentPrice,
  ...props
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
    <BottomFixedButton
      type="button"
      onClick={handlePaymentButtonClick}
      {...props}
    >
      결제하기
    </BottomFixedButton>
  );
}
