import { VFC } from 'react';
import { StyledOrderConfirmResultSubmitCard } from './styles';

const OrderConfirmResultSubmitCard: VFC = () => (
  <StyledOrderConfirmResultSubmitCard
    title="결제 금액"
    resultDescription="총 결제금액"
    resultAmount="325,600원"
    buttonText="325,600원 결제하기"
  />
);

export default OrderConfirmResultSubmitCard;
