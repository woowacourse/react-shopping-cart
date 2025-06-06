import { useLocation, useNavigate } from "react-router";
import { PAGE_URL } from "../../constants/PageUrl";
import * as Styled from "./PaymentConfirmation.style";

function PaymentConfirmation() {
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

  const { selectedCartItemsLength, selectedCartItemsCount, totalPrice } =
    location.state;

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.ContentSection>
          <Styled.Title>결제 확인</Styled.Title>
          <Styled.Description>
            총 {selectedCartItemsLength}종류의 상품 {selectedCartItemsCount}개를
            주문했습니다.
          </Styled.Description>
          <Styled.Description>
            최종 결제 금액을 확인해 주세요.
          </Styled.Description>
        </Styled.ContentSection>

        <Styled.PriceSection>
          <Styled.PriceLabel>총 결제 금액</Styled.PriceLabel>
          <Styled.PriceAmount>
            {totalPrice.toLocaleString()}원
          </Styled.PriceAmount>
        </Styled.PriceSection>
      </Styled.Wrapper>
      <Styled.GoBackToHomeButton onClick={handleGoBackToHomeButton}>
        장바구니로 돌아가기
      </Styled.GoBackToHomeButton>
    </Styled.Container>
  );
}

export default PaymentConfirmation;
