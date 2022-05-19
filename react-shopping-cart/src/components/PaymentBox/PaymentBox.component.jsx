import styled from 'styled-components';
import { Button, Divider, FlexWrapper, Text } from 'components/@shared';
import UnderlineText from 'components/UnderlineText/UnderlineText.component';
import { PALETTE } from 'styles/theme';

const Container = styled(FlexWrapper)`
  width: 448px;
  padding: 22px 0 35px;
  border: solid 1px ${({ theme }) => theme.PALETTE.GRAY_003};
`;

const PaymentAmountBox = styled(FlexWrapper)`
  width: 100%;
  padding: 0 7.5% 0;
`;

function PaymentBox({ title, paymentAmountLabel, paymentAmount, buttonLabel }) {
  return (
    <Container alignItems="flex-start" isColumnDirection={true}>
      <Text margin="0 7.5% 0" fontSize="large">
        {title}
      </Text>
      <Divider height="3px" margin="19px 0 34px" backgroundColor={PALETTE.GRAY_003} />
      <PaymentAmountBox justifyContent="space-between">
        <UnderlineText>{paymentAmountLabel}</UnderlineText>
        <UnderlineText>{paymentAmount.toLocaleString('ko-kr')}원</UnderlineText>
      </PaymentAmountBox>
      <Button
        style={{ alignSelf: 'center' }}
        width="85%"
        height="73px"
        margin="68px 0 0"
        backgroundColor={PALETTE.MINT_001}
      >
        <Text fontSize="large" color={PALETTE.WHITE_001}>
          {buttonLabel}
        </Text>
      </Button>
    </Container>
  );
}

export default PaymentBox;
