import * as styled from './Cart.styled';

import { CartContainer } from '../../CartContainer/CartContainer';
import { OrderSummary } from '../../OrderSummary/OrderSummary';

export const Cart = () => {
  return (
    <>
      <styled.PageTitle>장바구니</styled.PageTitle>
      <styled.Content>
        <CartContainer />
        <OrderSummary />
      </styled.Content>
    </>
  );
};
