import { VFC } from 'react';
import { KRCurrency } from '../../../utils/format';
import { StyledOrderConfirmResultSubmitCard } from './styles';

interface Props {
  totalPrice: number;
}

const OrderConfirmResultSubmitCard: VFC<Props> = ({ totalPrice }) => (
  <StyledOrderConfirmResultSubmitCard
    title="결제 금액"
    resultDescription="총 결제금액"
    resultAmount={KRCurrency(totalPrice)}
    buttonText={`${KRCurrency(totalPrice)} 결제하기`}
  />
);

export default OrderConfirmResultSubmitCard;
