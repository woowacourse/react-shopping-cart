import {
  StyledCartSummaryTotalContainer,
  StyledDeliveryInfo,
  StyledDeliveryInfoImg,
  StyledDeliveryInfoText,
  StyledCartSummaryDetailPrice,
  StyledCartSummaryTotalPrice,
} from "./CartSummary.styled";
import InfoIcon from "../../assets/InfoIcon.png";
import { CartSummaryItem } from "./CartSummaryItem";

export const CartSummary: React.FC = () => {
  return (
    <div>
      <StyledDeliveryInfo>
        <StyledDeliveryInfoImg src={InfoIcon} alt="info" />
        <StyledDeliveryInfoText>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </StyledDeliveryInfoText>
      </StyledDeliveryInfo>

      <StyledCartSummaryTotalContainer>
        <StyledCartSummaryDetailPrice>
          <CartSummaryItem title="주문 금액" price={70000} />
          <CartSummaryItem title="배송비" price={3000} />
        </StyledCartSummaryDetailPrice>
        <StyledCartSummaryTotalPrice>
          <CartSummaryItem title="총 결제 금액" price={73000} />
        </StyledCartSummaryTotalPrice>
      </StyledCartSummaryTotalContainer>
    </div>
  );
};
