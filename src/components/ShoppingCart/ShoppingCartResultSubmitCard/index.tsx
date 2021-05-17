import { FC } from 'react';
import { KRCurrency } from '../../../utils/format';
import { StyledShoppingCartResultSubmitCard } from './styles';

interface Props {
  totalQuantity: number;
  totalPrice: number;
}

const ShoppingCartResultSubmitCard: FC<Props> = ({ totalQuantity, totalPrice }) => (
  <StyledShoppingCartResultSubmitCard
    title="결제예상금액"
    resultAmount={KRCurrency(totalPrice)}
    resultDescription="결제예상금액"
    buttonText={`주문하기(${totalQuantity}개)`}
  />
);

export default ShoppingCartResultSubmitCard;
