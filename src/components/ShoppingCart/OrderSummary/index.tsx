import styled from "styled-components";
import ORDER from "../../../constants/order";
import { totalCheckedCartItemsPriceState } from "../../../recoil/selectors";
import { useRecoilValue } from "recoil";
import IMAGES from "../../../assets/images/Images";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/styles";

const OrderSummary = () => {
  const totalPrice = useRecoilValue(totalCheckedCartItemsPriceState);
  const shippingFee = totalPrice && totalPrice < ORDER.shippingFreeThreshold ? ORDER.shippingFee : 0;
  const totalPayments = totalPrice + shippingFee;

  return (
    <OrderSummaryContainer>
      <OrderInfo>
        <InfoImg src={IMAGES.infoOutline} />총 주문 금액이 {ORDER.shippingFreeThreshold.toLocaleString()} 원 이상일 경우
        무료 배송됩니다.
      </OrderInfo>

      <HorizontalLine />

      <SummaryWrapper>
        <SummaryTitle>주문 금액</SummaryTitle>
        <SummaryPrice>{totalPrice.toLocaleString()}</SummaryPrice>
      </SummaryWrapper>

      <SummaryWrapper>
        <SummaryTitle>배송비</SummaryTitle>
        <SummaryPrice>{shippingFee.toLocaleString()}</SummaryPrice>
      </SummaryWrapper>

      <HorizontalLine />

      <SummaryWrapper>
        <SummaryTitle>총 결제 금액</SummaryTitle>
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

const OrderInfo = styled.p`
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
  line-height: 15px;
  text-align: left;
  color: ${COLOR.black};
`;

const InfoImg = styled.img`
  padding-right: 4px;
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
