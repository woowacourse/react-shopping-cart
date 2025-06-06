import { useLocation, useNavigate } from "react-router";
import { PAGE_URL } from "../../constants/PageUrl";
import * as Styled from "./OrderConfirmation.style";
import type { OrderConfirmationLocationState } from "../../type/OrderConfirmation";
import OrderConfirmationHeader from "../../components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import OrderConfirmationContent from "../../components/OrderConfirmation/OrderConfirmationContent/OrderConfirmationContent";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBackToHomeButton = () => {
    navigate(PAGE_URL.HOME);
  };

  if (!location.state) {
    return (
      <div>
        <h1>잘못된 접근입니다.</h1>
        <button onClick={() => navigate(PAGE_URL.HOME)}>홈으로</button>
      </div>
    );
  }

  const {
    selectedCartItemsLength,
    selectedCartItemsCount,
    totalPrice,
    shippingFee,
    selectedCartItemsData,
  } = location.state as OrderConfirmationLocationState;

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <OrderConfirmationHeader
          handleGoBackToHomeButton={handleGoBackToHomeButton}
        />
        <OrderConfirmationContent />
      </Styled.Wrapper>
    </Styled.Container>
  );
}

export default OrderConfirmation;
