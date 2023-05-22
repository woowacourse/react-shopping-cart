import { useRecoilValue } from 'recoil';
import { checkedCartItemsState } from '@recoil/atom';

import {
  StyledPaymentInfo,
  StyledPaymentSection,
} from './PaymentSection.styled';
import { Button } from '@components/commons/Button/Button';
import * as Text from '@commons/Text/Text';

const PaymentSection = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsState);

  console.log(checkedCartItems);

  return (
    <StyledPaymentSection>
      <Text.Paragraph>결제 예상 금액</Text.Paragraph>
      <StyledPaymentInfo>
        <div>
          <Text.Paragraph>총 상품가격</Text.Paragraph>
          <Text.Paragraph>가격</Text.Paragraph>
        </div>
        <div>
          <Text.Paragraph>총 배송비</Text.Paragraph>
          <Text.Paragraph>배송비</Text.Paragraph>
        </div>
        <div>
          <Text.Paragraph>총 주문금액</Text.Paragraph>
          <Text.Paragraph>금액</Text.Paragraph>
        </div>
      </StyledPaymentInfo>
      <Button width="100%" height="80px" backgroundColor="#333333">
        <Text.Description color="white">주문하기</Text.Description>
      </Button>
    </StyledPaymentSection>
  );
};

export default PaymentSection;
