import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "./CheckPaymentPage.styled";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/order";
import { OrderCalculator } from "../../utils/orderCalculator";

interface CheckPaymentState {
  selectedCartItems: ResponseCartItem[];
  totalPrice: number;
  orderPrice: number;
  deliveryPrice: number;
}

const isCheckPaymentState = (state: unknown): state is CheckPaymentState => {
  if (!state || typeof state !== "object") {
    return false;
  }

  const obj = state as Record<string, unknown>;

  if (!Array.isArray(obj.selectedCartItems)) {
    return false;
  }

  const isValidCartItems = obj.selectedCartItems.every((item: unknown) => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const cartItem = item as Record<string, unknown>;

    return (
      typeof cartItem.quantity === "number" &&
      cartItem.product &&
      typeof cartItem.product === "object" &&
      typeof (cartItem.product as Record<string, unknown>).price === "number"
    );
  });

  if (!isValidCartItems) {
    return false;
  }

  return (
    typeof obj.totalPrice === "number" &&
    typeof obj.orderPrice === "number" &&
    typeof obj.deliveryPrice === "number"
  );
};

const CheckPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  useEffect(() => {
    if (!isCheckPaymentState(state)) {
      console.error("Invalid state passed to CheckPaymentPage:", state);
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const handleBackToCart = (): void => {
    navigate("/", { replace: true });
  };

  if (!isCheckPaymentState(state)) {
    return null;
  }

  const orderSummary = OrderCalculator.calculateOrderSummary(
    state.selectedCartItems
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
