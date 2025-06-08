import * as S from "./PaymentSuccessPage.styled";
import Header from "@/shared/components/Header/Header";
import { ROUTES } from "@/shared/config/routes";
import useValidateLocationState from "@/shared/hooks/useValidateLocationState";
import Fallback from "@/shared/components/Fallback/Fallback";
import { isValidPaymentSuccessState } from "./validation/isValidPaymentSuccessState";
import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";
import PaymentPrice from "./PaymentPrice/PaymentPrice";
import CartNavigateButton from "./CartNavigateButton/CartNavigateButton";
import { getOrderQuantity } from "@/domains/utils/getOrderQuantity";

export default function PaymentSuccessPage() {
  const { state, isValidating } = useValidateLocationState({
    validationFn: isValidPaymentSuccessState,
    redirectPath: ROUTES.CART,
  });

  if (isValidating) {
    return (
      <Fallback type="loading" message="결제 확인 페이지로 이동 중입니다.." />
    );
  }

  const { orderList, paymentPrice } = state;

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
