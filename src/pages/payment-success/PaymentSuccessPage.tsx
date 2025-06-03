import * as S from "./PaymentSuccessPage.styled";
import Header from "@/shared/components/Header/Header";
import { ROUTES } from "@/shared/config/routes";
import useValidateLocationState from "@/shared/hooks/useValidateLocationState";
import Fallback from "@/shared/components/Fallback";
import { isOrderSuccessState } from "@/domains/validation/isOrderSuccessState";
import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";
import PaymentPrice from "./PaymentPrice/PaymentPrice";
import CartNavigateButton from "./CartNavigateButton/CartNavigateButton";

export default function PaymentSuccessPage() {
  const { state, isValidating } = useValidateLocationState({
    validationFn: isOrderSuccessState,
    redirectPath: ROUTES.CART,
  });

  if (isValidating) {
    return (
      <Fallback type="loading" message="결제 확인 페이지로 이동 중입니다.." />
    );
  }

  const { orderList, paymentPrice } = state;
  const orderListCount = orderList.length;
  const orderQuantity = orderList.reduce(
    (acc, { quantity }) => (acc += quantity),
    0
  );

  return (
    <>
      <Header />
      <S.Container>
        <S.OrderContainer>
          <OrderSummary
            title="결제 확인"
            orderListCount={orderListCount}
            orderQuantity={orderQuantity}
          />
          <PaymentPrice paymentPrice={paymentPrice} />
        </S.OrderContainer>
        <CartNavigateButton />
      </S.Container>
    </>
  );
}
