import styled from "styled-components";
import ORDER from "../../../constants/order";
import { shippingFeeState, totalCheckedCartItemsPriceState } from "../../../recoil/selectors";
import { useRecoilValue } from "recoil";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/styles";
import { SHOPPING_MESSAGE } from "../../../constants/messages";
import InfoText from "../../common/InfoText";

interface OrderSummaryProps {
  discountAmount?: number;
}

const OrderSummary = ({ discountAmount }: OrderSummaryProps) => {
  const totalPrice = useRecoilValue(totalCheckedCartItemsPriceState);
  const shippingFee = useRecoilValue(shippingFeeState);
  const totalPayments = discountAmount ? totalPrice + shippingFee - discountAmount : totalPrice + shippingFee;

  return (
    <OrderSummaryContainer>
      <InfoText text={SHOPPING_MESSAGE.freeShippingFeeInfo(ORDER.shippingFreeThreshold.toLocaleString())} />

      <HorizontalLine />

      <SummaryWrapper>
        <SummaryTitle>{SHOPPING_MESSAGE.orderAmount}</SummaryTitle>
        <SummaryPrice>{totalPrice.toLocaleString()}</SummaryPrice>
      </SummaryWrapper>

      {discountAmount !== undefined && (
        <SummaryWrapper>
          <SummaryTitle>할인 금액</SummaryTitle>
          <SummaryPrice>{discountAmount.toLocaleString()}</SummaryPrice>
        </SummaryWrapper>
      )}

      <SummaryWrapper>
        <SummaryTitle>{SHOPPING_MESSAGE.shippingFee}</SummaryTitle>
        <SummaryPrice>{shippingFee.toLocaleString()}</SummaryPrice>
      </SummaryWrapper>

      <HorizontalLine />

      <SummaryWrapper>
        <SummaryTitle>{SHOPPING_MESSAGE.totalPayAmount}</SummaryTitle>
        <SummaryPrice>{totalPayments.toLocaleString()}</SummaryPrice>
      </SummaryWrapper>
    </OrderSummaryContainer>
  );
};

export default OrderSummary;

const OrderSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 52px;
`;

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SummaryTitle = styled.p`
  font-size: ${FONT_SIZE.medium};
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 16px;
  text-align: left;
  color: ${COLOR.black};
`;

const SummaryPrice = styled.p`
  font-size: ${FONT_SIZE.large};
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 34.75px;
  text-align: right;
  color: ${COLOR.black};
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
