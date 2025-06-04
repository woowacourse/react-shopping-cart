import { useLocation, useNavigate } from "react-router";
import * as Styled from "./OrderComplete.style.tsx";
import { OrderConfirmationLocationState } from "@/type/OrderConfirmation";
import { PAGE_URL } from "@/constants/PageUrl";
import ErrorPage from "../Error/ErrorPage";
import Header from "@/components/common/Header/Header.tsx";
import { isCartItem } from "@/util/validationTool.ts";

interface OrderCompleteProps {
  onReset: () => void;
}

function OrderComplete({ onReset }: OrderCompleteProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOrderConfirm = async () => {
    navigate(PAGE_URL.HOME);
    onReset();
  };

  const isValidOrderConfirmationState = (
    state: unknown
  ): state is OrderConfirmationLocationState => {
    if (!state || typeof state !== "object") {
      return false;
    }

    const typedState = state as Record<string, unknown>;
    return (
      Array.isArray(typedState.selectedCartItems) &&
      typedState.selectedCartItems.every(isCartItem) &&
      typeof typedState.finalPrice === "number" &&
      typedState.finalPrice >= 0
    );
  };

  if (!location.state || !isValidOrderConfirmationState(location.state)) {
    return <ErrorPage />;
  }

  const { selectedCartItems, finalPrice } = location.state;

  return (
    <Styled.Container>
      <Header />
      <Styled.Wrapper>
        <Styled.ContentSection>
          <Styled.Title>주문 확인</Styled.Title>
          <Styled.Description>
            총 {selectedCartItems.length}종류의 상품
            {selectedCartItems.reduce((acc, item) => acc + item.quantity, 0)}
            개를 주문합니다.
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

      <Styled.OrderConfirmButton onClick={handleOrderConfirm}>
        결제하기
      </Styled.OrderConfirmButton>
    </Styled.Container>
  );
}

export default OrderComplete;
