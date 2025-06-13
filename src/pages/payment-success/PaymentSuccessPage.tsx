import * as S from "./PaymentSuccessPage.styled";
import Header from "@/shared/components/Header/Header";
import Fallback from "@/shared/components/Fallback/Fallback";
import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";
import PaymentPrice from "./PaymentPrice/PaymentPrice";
import CartNavigateButton from "./CartNavigateButton/CartNavigateButton";
import { getOrderQuantity } from "@/domains/utils/getOrderQuantity";
import { usePaymentSuccessPageState } from "./hooks/usePaymentSuccessState";

export default function PaymentSuccessPage() {
  const { orderList, paymentPrice, isLoading } = usePaymentSuccessPageState();

  if (isLoading) {
    return (
      <Fallback type="loading" message="결제 확인 페이지로 이동 중입니다.." />
    );
  }

  return (
    <>
      <Header />
      <S.Container>
        <S.OrderContainer>
          <OrderSummary
            title="결제 확인"
            orderListCount={orderList.length}
            orderQuantity={getOrderQuantity(orderList)}
          />
          <PaymentPrice paymentPrice={paymentPrice} />
        </S.OrderContainer>
        <CartNavigateButton />
      </S.Container>
    </>
  );
}
