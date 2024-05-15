import Header from "../components/header/Header";
import {
  StyledConfirmatioinPagePriceContainer,
  StyledConfirmationPage,
  StyledConfirmationPageDescription,
  StyledConfirmationPagePrice,
  StyledConfirmationPageSubTitle,
  StyledConfirmationPageTitle,
} from "./OrderConfirmationPage.styled";

export const OrderConfirmationPage: React.FC = () => {
  const price = 70000;

  return (
    <>
      <Header type="back" />
      <StyledConfirmationPage>
        <StyledConfirmationPageTitle>주문확인 </StyledConfirmationPageTitle>
        <StyledConfirmationPageDescription>
          <span>총 2종류의 상품 2개를 주문합니다.</span>
          <span> 최종 결제 금액을 확인해 주세요.</span>
        </StyledConfirmationPageDescription>
        <StyledConfirmatioinPagePriceContainer>
          <StyledConfirmationPageSubTitle>
            총 결제 금액
          </StyledConfirmationPageSubTitle>
          <StyledConfirmationPagePrice>
            {price.toLocaleString()}원
          </StyledConfirmationPagePrice>
        </StyledConfirmatioinPagePriceContainer>
      </StyledConfirmationPage>
    </>
  );
};
