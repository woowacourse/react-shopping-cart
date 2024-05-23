import * as Styled from './style';
import { Content } from '../style';

import { useRecoilValue } from 'recoil';

import {
  selectedCartItemsCountSelector,
  totalCartItemQuantitySelector,
  totalPaymentAmountSelector,
} from '../../../recoil/selectors';

import MESSAGE from '../../../constants/Message';

const PaymentConfirmationContent = () => {
  const totalCartItemQuantity = useRecoilValue(totalCartItemQuantitySelector);
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountSelector);
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountSelector);

  return (
    <Content>
      <Styled.Details>
        <Styled.Title>{MESSAGE.paymentConfirmation}</Styled.Title>
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

export default PaymentConfirmationContent;
