import { useRecoilValue } from "recoil";
import { ConfirmButton } from "../components/button/ConfirmButton";
import Header from "../components/header/Header";
import {
  StyledConfirmatioinPagePriceContainer,
  StyledConfirmationPage,
  StyledConfirmationPageDescription,
  StyledConfirmationPagePrice,
  StyledConfirmationPageSubTitle,
  StyledConfirmationPageTitle,
} from "./OrderConfirmationPage.styled";
import { totalPriceState } from "../recoil/selector";

export const OrderConfirmationPage: React.FC = () => {
  const totalPrice = useRecoilValue(totalPriceState);

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
            {totalPrice.toLocaleString()}원
          </StyledConfirmationPagePrice>
        </StyledConfirmatioinPagePriceContainer>
      </StyledConfirmationPage>
      <ConfirmButton text="결제하기" backgroundColor="rgba(190, 190, 190, 1)" />
    </>
  );
};
