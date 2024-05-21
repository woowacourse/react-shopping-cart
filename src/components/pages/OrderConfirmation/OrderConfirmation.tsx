import * as Styled from './style';

import { useNavigate } from 'react-router-dom';

import Header from '../../Header/Header';
import OrderButton from '../../OrderButton/OrderButton';

import { useRecoilValue } from 'recoil';
import {
  selectedCartItemsCountState,
  totalCartItemQuantityState,
  totalPaymentAmountState,
} from '../../../recoil/cartItems';

import MESSAGE from '../../../constants/Message';

const OrderConfirmation = () => {
  const navigator = useNavigate();

  const totalCartItemQuantity = useRecoilValue(totalCartItemQuantityState);
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountState);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountState);

  return (
    <Styled.OrderConfirmation>
      <Header onClick={() => navigator('/')} />

      <Styled.Container>
        <Styled.Content>
          <Styled.Title>{MESSAGE.orderConfirmation}</Styled.Title>
          <Styled.OrderSuccessMessage>
            {MESSAGE.orderSuccess(
              selectedCartItemsCount,
              totalCartItemQuantity,
            )}
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
