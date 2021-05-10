import { VFC } from 'react';
import { StyledShoppingCartResultSubmitCard } from './styles';

interface Props {
  totalQuantity: number;
  totalPrice: number;
}

const ShoppingCartResultSubmitCard: VFC<Props> = ({ totalQuantity, totalPrice }) => (
  <StyledShoppingCartResultSubmitCard
    title="결제예상금액"
    resultAmount={`${totalPrice}원`}
    resultDescription="결제예상금액"
    buttonText={`주문하기(${totalQuantity}개)`}
  />
);

export default ShoppingCartResultSubmitCard;
