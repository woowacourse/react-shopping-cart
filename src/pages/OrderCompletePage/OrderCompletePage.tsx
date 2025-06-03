import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "./OrderCompletePage.styled";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/types";
interface OrderCompleteState {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
  orderPrice: number;
  deliveryPrice: number;
}

const OrderCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as OrderCompleteState;

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const handlePayment = (): void => {
    navigate("/", { replace: true });
  };

  return (
    <S.Root>
      <S.OrderCompletePageWrapper>
        <Header isOrderComplete={true} setIsOrderComplete={() => {}} />
        <OrderResult
          selectedCartItem={state.selectedCartItem}
          totalPrice={state.totalPrice}
        />
        <S.ButtonContainer>
          <S.PaymentButton onClick={handlePayment}>결제하기</S.PaymentButton>
        </S.ButtonContainer>
      </S.OrderCompletePageWrapper>
    </S.Root>
  );
};

export default OrderCompletePage;
