import Header from 'components/base/header/Header';
import {
  PaymentAccountContent,
  PaymentAccountTitle,
  PaymentAccountBox,
  PaymentAccountTitleText,
  OrderButton,
} from './style';

const PaymentAccount = ({ totalPrice, totalAmount }) => {
  return (
    <PaymentAccountBox>
      <PaymentAccountTitle>결제예상금액</PaymentAccountTitle>
      <PaymentAccountContent>
        <Header
          left={<PaymentAccountTitleText>결제예상금액</PaymentAccountTitleText>}
          right={<PaymentAccountTitleText>{totalPrice}원</PaymentAccountTitleText>}
        />
        <OrderButton>주문하기({totalAmount}개)</OrderButton>
      </PaymentAccountContent>
    </PaymentAccountBox>
  );
};

export default PaymentAccount;
