import Header from 'components/base/header/Header';

import { Content, Title, Box, TitleText, OrderButton } from './style';

const PaymentAccount = ({ totalPrice, totalAmount }) => {
  return (
    <Box>
      <Title>결제예상금액</Title>
      <Content>
        <Header
          left={<TitleText>결제예상금액</TitleText>}
          right={<TitleText>{totalPrice}원</TitleText>}
        />
        <OrderButton>주문하기({totalAmount}개)</OrderButton>
      </Content>
    </Box>
  );
};

export default PaymentAccount;
