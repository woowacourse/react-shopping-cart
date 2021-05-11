import { VFC } from 'react';
import { StyledOrderConfirmResultSubmitCard } from './styles';

interface Props {
  totalPrice: number;
}

const OrderConfirmResultSubmitCard: VFC<Props> = ({ totalPrice }) => (
  <StyledOrderConfirmResultSubmitCard
    title="결제 금액"
    resultDescription="총 결제금액"
    resultAmount={`${totalPrice}원`}
    buttonText={`${totalPrice}원 결제하기`}
  />
);

export default OrderConfirmResultSubmitCard;
