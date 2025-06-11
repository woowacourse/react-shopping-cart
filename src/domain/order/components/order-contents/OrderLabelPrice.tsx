import styled from "@emotion/styled";
import { Flex } from "../../../../components/common";
import LabelPrice from "../../../../components/common/text/LabelPrice";
import { FREE_SHIPPING_STANDARD } from "../../hooks/OrderConstants";
import { formatKRWString } from "../../../../utils/formatKRWString";
import InfoText from "../../../../components/common/text/InfoText";

interface OrderLabelPridceProps {
  totalCartPrice: number;
  shippingFee: number;
  totalPrice: number;
  couponDiscount: number;
}

const OrderLabelPridce = ({
  totalCartPrice,
  shippingFee,
  totalPrice,
  couponDiscount,
}: OrderLabelPridceProps) => {
  const InfoTextContent = ` 총 주문 금액이 ${formatKRWString(
    FREE_SHIPPING_STANDARD
  )} 이상일 경우
          무료 배송됩니다.`;

  return (
    <Container>
      <InfoText contentText={InfoTextContent} />
      <PriceWrapper>
        <LabelPrice label="주문 금액" price={totalCartPrice} />
        <LabelPrice
          ariaLabel="coupon-discount"
          label="쿠폰 할인 금액"
          price={couponDiscount}
        />
        <LabelPrice
          ariaLabel="shipping-fee"
          label="배송비"
          price={shippingFee}
        />
      </PriceWrapper>
      <LabelPrice label="총 결제 금액" price={totalPrice} />
    </Container>
  );
};

export default OrderLabelPridce;

const Container = styled(Flex)`
  flex-direction: column;
  gap: 20px;
`;

const PriceWrapper = styled(Flex)`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 16px 0;
  gap: 16px;
`;
