import * as S from "./PaymentSuccessPage.styled";
import Header from "@/shared/components/Header/Header";
import { ROUTES } from "@/shared/config/routes";
import useValidateLocationState from "@/shared/hooks/useValidateLocationState";
import Fallback from "@/shared/components/Fallback";
import { isOrderSuccessState } from "@/domains/validation/isOrderSuccessState";
import OrderSummary from "@/domains/components/OrderSummary/OrderSummary";

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
          <S.OrderPriceContainer>
            <S.OrderPriceTitle>총 결제 금액</S.OrderPriceTitle>
            <S.OrderPriceText>
              {paymentPrice.toLocaleString()}원
            </S.OrderPriceText>
          </S.OrderPriceContainer>
        </S.OrderContainer>
        <S.PayConfirmButton type="button">
          장바구니로 돌아가기
        </S.PayConfirmButton>
      </S.Container>
    </>
  );
}
