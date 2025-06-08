// pages/CheckPaymentPage/CheckPaymentPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "./CheckPaymentPage.styled";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/order";
import { OrderCalculator } from "../../utils/orderCalculator";

interface CheckPaymentState {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
  orderPrice: number;
  deliveryPrice: number;
}

const CheckPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as CheckPaymentState;

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const handleBackToCart = (): void => {
    navigate("/", { replace: true });
  };

  if (!state) return null;

  const orderSummary = OrderCalculator.calculateOrderSummary(
    state.selectedCartItem
  );

  return (
    <S.Root>
      <S.OrderCompletePageWrapper>
        <Header showBackButton={false} title="" />
        <S.OrderResultWrapper>
          <OrderResult
            orderSummary={orderSummary}
            totalPrice={state.totalPrice}
            orderStatus="check-payment"
          />
        </S.OrderResultWrapper>
        <S.ButtonContainer>
          <S.PaymentButton onClick={handleBackToCart}>결제하기</S.PaymentButton>
        </S.ButtonContainer>
      </S.OrderCompletePageWrapper>
    </S.Root>
  );
};

export default CheckPaymentPage;
