import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as S from "./OrderCompletePage.styled";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/types";
import CartItem from "../../components/CartItem/CartItem";
import CheckBox from "../../components/CheckBox/CheckBox";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
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
    console.log("OrderCompletePage state:", state);
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const handleBackToCart = (): void => {
    navigate("/", { replace: true });
  };

  const handleCheckPayment = (): void => {
    navigate("/check-payment", {
      state: {
        selectedCartItem: state.selectedCartItem,
        totalPrice: state.totalPrice,
        orderPrice: state.orderPrice,
        deliveryPrice: state.deliveryPrice,
      },
    });
  };

  return (
    <S.Root>
      <S.OrderCompletePageWrapper>
        <Header
          orderStatus="order-complete"
          setIsOrderComplete={handleBackToCart}
        />
        <S.OrderResultWrapper>
          <OrderResult
            selectedCartItem={state.selectedCartItem}
            totalPrice={state.totalPrice}
            orderStatus="order-complete"
          />
        </S.OrderResultWrapper>
        <S.CartItemWrapper>
          {state.selectedCartItem.map((item) => (
            <CartItem key={item.id} cart={item} />
          ))}
          <S.CouponButton>쿠폰 적용</S.CouponButton>
          <S.DeliveryInfo>
            <S.DeliveryInfoTitle>배송 정보</S.DeliveryInfoTitle>
            <CheckBox isChecked={false} text="제주도 및 도서 산간 지역" />
          </S.DeliveryInfo>
          <OrderPriceSection
            orderPrice={state.orderPrice}
            deliveryPrice={state.deliveryPrice}
            couponPrice={10000}
          />
        </S.CartItemWrapper>

        <S.ButtonContainer>
          <S.PaymentButton onClick={handleCheckPayment}>
            결제하기
          </S.PaymentButton>
        </S.ButtonContainer>
      </S.OrderCompletePageWrapper>
    </S.Root>
  );
};

export default OrderCompletePage;
