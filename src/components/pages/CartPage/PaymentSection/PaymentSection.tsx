import { useGenerateTotalPrice } from './useGenerateTotalPrice';

import {
  StyledPaymentInfoBox,
  StyledPaymentInfo,
  StyledPaymentSection,
  StyledPaymentResult,
  StyledFlexBox,
} from './PaymentSection.styled';
import { Button } from '@components/commons/Button/Button';
import * as Text from '@commons/Text/Text';

const PaymentSection = () => {
  const { totalCartPrice, totalDeliveryPrice, totalOrderPrice } =
    useGenerateTotalPrice();

  return (
    <StyledPaymentSection>
      <StyledPaymentInfoBox>
        <Text.Paragraph>결제 예상 금액</Text.Paragraph>
        <StyledPaymentInfo>
          <StyledFlexBox>
            <div>
              <Text.Paragraph>총 상품가격</Text.Paragraph>
              <Text.Paragraph>{totalCartPrice}</Text.Paragraph>
            </div>
            <div>
              <Text.Paragraph>총 배송비</Text.Paragraph>
              <Text.Paragraph>{totalDeliveryPrice}</Text.Paragraph>
            </div>
          </StyledFlexBox>
          <StyledPaymentResult>
            <Text.Paragraph>총 주문금액</Text.Paragraph>
            <Text.Paragraph>{totalOrderPrice}</Text.Paragraph>
          </StyledPaymentResult>
          <Button width="100%" height="60px" backgroundColor="#333333">
            <Text.Description color="white">주문하기</Text.Description>
          </Button>
        </StyledPaymentInfo>
      </StyledPaymentInfoBox>
    </StyledPaymentSection>
  );
};

export default PaymentSection;
