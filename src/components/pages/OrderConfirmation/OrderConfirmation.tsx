import * as Styled from './style';

import Header from '../../Header/Header';
import OrderButton from '../../OrderButton/OrderButton';

import { useRecoilValue } from 'recoil';
import { cartItemsCalculatorState } from '../../../recoil/cartItems';
import { useNavigate } from 'react-router-dom';

import MESSAGE from '../../../constants/Message';

const OrderConfirmation = () => {
  const navigator = useNavigate();

  const { totalCartItemQuantity, selectedCartItemCount, totalPaymentAmount } =
    useRecoilValue(cartItemsCalculatorState);

  return (
    <Styled.OrderConfirmation>
      <Header children={MESSAGE.backSpace} onClick={() => navigator(-1)} />

      <Styled.Container>
        <Styled.Content>
          <Styled.Title>{MESSAGE.orderConfirmation}</Styled.Title>
          <Styled.OrderSuccessMessage>
            {MESSAGE.orderSuccess(selectedCartItemCount, totalCartItemQuantity)}
            <br />
            {MESSAGE.paymentAmountConfirmation}
          </Styled.OrderSuccessMessage>
          <Styled.TotalPaymentAmountContainer>
            <Styled.TotalPaymentAmountMessage>
              {MESSAGE.totalPaymentAmount}
            </Styled.TotalPaymentAmountMessage>
            <Styled.TotalPaymentAmount>
              {totalPaymentAmount.toLocaleString('ko-kr')}
              {MESSAGE.koreanCurrencyUnit}
            </Styled.TotalPaymentAmount>
          </Styled.TotalPaymentAmountContainer>
        </Styled.Content>
      </Styled.Container>

      <OrderButton
        onClick={() => console.log(MESSAGE.orderConfirmation)}
        children={MESSAGE.pay}
        isOrderable={false}
      />
    </Styled.OrderConfirmation>
  );
};

export default OrderConfirmation;
