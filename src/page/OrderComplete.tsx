import { useLocation, useNavigate } from "react-router";
import { PAGE_URL } from "../constants/PageUrl";
import * as Styled from "./OrderConfirmation.style";
import type { OrderConfirmationLocationState } from "../type/OrderConfirmation";
import ErrorPage from "./ErrorPage";
import Header from "@/components/common/Header/Header";

function OrderComplete() {
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
      typeof typedState.finalPrice === "number" &&
      typedState.selectedCartItemsLength >= 0 &&
      typedState.selectedCartItemsCount >= 0 &&
      typedState.finalPrice >= 0 &&
      Number.isInteger(typedState.selectedCartItemsLength) &&
      Number.isInteger(typedState.selectedCartItemsCount)
    );
  };

  if (!location.state || !isValidOrderConfirmationState(location.state)) {
    return <ErrorPage />;
  }

  const { selectedCartItemsLength, selectedCartItemsCount, finalPrice } =
    location.state;

  return (
    <Styled.Container>
      <Header />
      <Styled.Wrapper>
        <Styled.ContentSection>
          <Styled.Title>결제 확인</Styled.Title>
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

      <Styled.OrderConfirmButton onClick={handleGoBackToHomeButton}>
        장바구니로 돌아가기
      </Styled.OrderConfirmButton>
    </Styled.Container>
  );
}

export default OrderComplete;
