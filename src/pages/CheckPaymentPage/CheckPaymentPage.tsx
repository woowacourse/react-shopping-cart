import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "./CheckPaymentPage.styled";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/types";
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

  return (
    <S.Root>
      <S.OrderCompletePageWrapper>
        <Header orderStatus="check-payment" />
        <S.OrderResultWrapper>
          <OrderResult
            selectedCartItem={state.selectedCartItem}
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
