import { useRecoilValue } from "recoil";
import InfoIcon from "../../../assets/InfoIcon.png";
import { INFO_MESSAGES } from "../../../constants";
import { cartSummarySelectorState } from "../../../recoil/selector/selector";
import { CartSummaryItem } from "../cartSummaryItem/CartSummaryItem";
import {
  StyledCartSummaryDetailPrice,
  StyledCartSummaryTotalContainer,
  StyledCartSummaryTotalPrice,
  StyledDeliveryInfo,
  StyledDeliveryInfoImg,
  StyledDeliveryInfoText,
} from "./CartSummary.styled";

export const CartSummary: React.FC = () => {
  const { orderPrice, deliveryPrice, totalPrice } = useRecoilValue(cartSummarySelectorState);

  return (
    <div>
      <StyledDeliveryInfo>
        <StyledDeliveryInfoImg src={InfoIcon} alt="info" />
        <StyledDeliveryInfoText>{INFO_MESSAGES.FREE_DELIVERY}</StyledDeliveryInfoText>
      </StyledDeliveryInfo>

      <StyledCartSummaryTotalContainer>
        <StyledCartSummaryDetailPrice>
          <CartSummaryItem title="주문 금액" price={orderPrice} />
          <CartSummaryItem title="배송비" price={deliveryPrice} />
        </StyledCartSummaryDetailPrice>
        <StyledCartSummaryTotalPrice>
          <CartSummaryItem title="총 결제 금액" price={totalPrice} />
        </StyledCartSummaryTotalPrice>
      </StyledCartSummaryTotalContainer>
    </div>
  );
};
