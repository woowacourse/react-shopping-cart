import * as Styled from './style';
import { Content } from '../style';

import {
  selectedCartItemsCountState,
  totalCartItemQuantityState,
  totalPaymentAmountState,
} from '../../../recoil/cartItems';
import { useRecoilValue } from 'recoil';

import MESSAGE from '../../../constants/Message';

const OrderConfirmationContent = () => {
  const totalCartItemQuantity = useRecoilValue(totalCartItemQuantityState);
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountState);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountState);

  return (
    <Content>
      <Styled.Details>
        <Styled.Title>{MESSAGE.orderConfirmation}</Styled.Title>
        <Styled.OrderSuccessMessage>
          {MESSAGE.orderSuccess(selectedCartItemsCount, totalCartItemQuantity)}
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
      </Styled.Details>
    </Content>
  );
};

export default OrderConfirmationContent;
