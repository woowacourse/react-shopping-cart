import * as Styled from './style';
import { Content as StyledContent } from '../style';

import { useRecoilValue } from 'recoil';

import {
  finalTotalPaymentAmountSelector,
  selectedCartItemsCountSelector,
  totalCartItemQuantitySelector,
} from '../../../recoil/selectors';

import Title from '../../Title/Title';
import Caption from '../../Caption/Caption';

import MESSAGE from '../../../constants/Message';

const PaymentConfirmationContent = () => {
  const totalCartItemQuantity = useRecoilValue(totalCartItemQuantitySelector);
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountSelector);
  const totalPaymentAmount = useRecoilValue(finalTotalPaymentAmountSelector);

  return (
    <StyledContent>
      <Styled.Details>
        <Title>{MESSAGE.paymentConfirmation}</Title>
        <Caption>
          {MESSAGE.orderSuccess(selectedCartItemsCount, totalCartItemQuantity)}
          <br />
          {MESSAGE.paymentAmountConfirmation}
        </Caption>
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
    </StyledContent>
  );
};

export default PaymentConfirmationContent;
