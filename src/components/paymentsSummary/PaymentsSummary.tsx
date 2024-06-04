import { useRecoilValue } from "recoil";
import { INFO_MESSAGES } from "../../constants";
import { cartSummarySelectorState } from "../../recoil/selector/selector";
import { formatPrice } from "../../utils/formatPrice";
import {
  StyledConfirmationPage,
  StyledConfirmationPageDescription,
  StyledConfirmationPagePrice,
  StyledConfirmationPagePriceContainer,
  StyledConfirmationPageSubTitle,
  StyledConfirmationPageTitle,
} from "./PaymentsSummary.styled";
import { useTotalDiscount } from "../../hooks/useTotalDiscount";

export const PaymentsSummary: React.FC = () => {
  const { orderTotalPrice, uniqueItemCount, totalItemCount } =
    useRecoilValue(cartSummarySelectorState);
  const totalDiscountPrice = useTotalDiscount();
  const orderTotalPriceFinal = orderTotalPrice - totalDiscountPrice;

  return (
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
        <StyledConfirmationPagePrice>
          {formatPrice(orderTotalPriceFinal)}원
        </StyledConfirmationPagePrice>
      </StyledConfirmationPagePriceContainer>
    </StyledConfirmationPage>
  );
};
