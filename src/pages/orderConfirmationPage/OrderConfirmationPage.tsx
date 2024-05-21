import { useRecoilValue } from "recoil";
import { ConfirmButton } from "../../components/button";
import Header from "../../components/header/Header";
import { BUTTON_COLORS, HEADER_TYPES, INFO_MESSAGES } from "../../constants";
import { cartSummarySelectorState } from "../../recoil/selector/selector";
import {
  StyledConfirmationPage,
  StyledConfirmationPageDescription,
  StyledConfirmationPagePrice,
  StyledConfirmationPagePriceContainer,
  StyledConfirmationPageSubTitle,
  StyledConfirmationPageTitle,
} from "./OrderConfirmationPage.styled";

export const OrderConfirmationPage: React.FC = () => {
  const { totalPrice, uniqueItemCount, totalItemCount } = useRecoilValue(cartSummarySelectorState);

  return (
    <>
      <Header type={HEADER_TYPES.BACK} />
      <StyledConfirmationPage>
        <StyledConfirmationPageTitle>주문확인 </StyledConfirmationPageTitle>
        <StyledConfirmationPageDescription>
          <span>
            총 {uniqueItemCount}종류의 상품 {totalItemCount}개를 주문합니다.
          </span>
          <span>{INFO_MESSAGES.CHECK_TOTAL_PRICE}</span>
        </StyledConfirmationPageDescription>
        <StyledConfirmationPagePriceContainer>
          <StyledConfirmationPageSubTitle>총 결제 금액</StyledConfirmationPageSubTitle>
          <StyledConfirmationPagePrice>{totalPrice.toLocaleString()}원</StyledConfirmationPagePrice>
        </StyledConfirmationPagePriceContainer>
      </StyledConfirmationPage>
      <ConfirmButton text="결제하기" mode={BUTTON_COLORS.LIGHT} />
    </>
  );
};
