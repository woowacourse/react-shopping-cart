import Header from 'components/base/header/Header';

import { TotalAmountContainer, TotalAmountBox, Title, TitleText, OrderButton } from './style';

const PaymentAccount = ({ totalPrice, totalAmount }) => {
  return (
    <TotalAmountContainer>
      <Title>결제예상금액</Title>
      <TotalAmountBox>
        <Header
          left={<TitleText>결제예상금액</TitleText>}
          right={<TitleText>{totalPrice}원</TitleText>}
        />
        <OrderButton>주문하기({totalAmount}개)</OrderButton>
      </TotalAmountBox>
    </TotalAmountContainer>
  );
};

export default PaymentAccount;
