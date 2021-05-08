import { VFC } from 'react';
import { StyledShoppingCartResultSubmitCard } from './styles';

const ShoppingCartResultSubmitCard: VFC = () => (
  <StyledShoppingCartResultSubmitCard
    title="결제예상금액"
    resultAmount="21,700원"
    resultDescription="결제예상금액"
    buttonText="주문하기(2개)"
  />
);

export default ShoppingCartResultSubmitCard;
