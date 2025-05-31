import { useLocation, useNavigate } from "react-router";
import { PAGE_URL } from "../constants/PageUrl";
import * as Styled from "./OrderConfirmation.style";
import OrderConfirmationHeader from "../components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import type { OrderConfirmationLocationState } from "../type/OrderConfirmation";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBackToHomeButton = () => {
    navigate(PAGE_URL.HOME);
  };
  const isValidOrderConfirmationState = (
    state: unknown
  ): state is OrderConfirmationLocationState => {
    if (!state || typeof state !== "object") {
      return false;
    }

    const typedState = state as Record<string, unknown>;

    return (
      typeof typedState.selectedCartItemsLength === "number" &&
      typeof typedState.selectedCartItemsCount === "number" &&
      typeof typedState.totalPrice === "number" &&
      typedState.selectedCartItemsLength >= 0 &&
      typedState.selectedCartItemsCount >= 0 &&
      typedState.totalPrice >= 0 &&
      Number.isInteger(typedState.selectedCartItemsLength) &&
      Number.isInteger(typedState.selectedCartItemsCount)
    );
  };

  if (!location.state || !isValidOrderConfirmationState(location.state)) {
    return (
      <div>
        <h1>잘못된 접근입니다.</h1>
        <button onClick={() => navigate(PAGE_URL.HOME)}>홈으로</button>
      </div>
    );
  }

  const { selectedCartItemsLength, selectedCartItemsCount, finalPrice } =
    location.state;

  return (
    <Styled.Container>
      <OrderConfirmationHeader
        handleGoBackToHomeButton={handleGoBackToHomeButton}
      />

      <Styled.Wrapper>
        <Styled.ContentSection>
          <Styled.Title>주문 확인</Styled.Title>
          <Styled.Description>
            총 {selectedCartItemsLength}종류의 상품 {selectedCartItemsCount}개를
            주문합니다.
          </Styled.Description>
          <Styled.Description>
            최종 결제 금액을 확인해 주세요.
          </Styled.Description>
        </Styled.ContentSection>

        <Styled.PriceSection>
          <Styled.PriceLabel>총 결제 금액</Styled.PriceLabel>
          <Styled.PriceAmount>
            {finalPrice.toLocaleString()}원
          </Styled.PriceAmount>
        </Styled.PriceSection>
      </Styled.Wrapper>

      <Styled.OrderConfirmButton disabled={true}>
        결제하기
      </Styled.OrderConfirmButton>
    </Styled.Container>
  );
}

export default OrderConfirmation;
