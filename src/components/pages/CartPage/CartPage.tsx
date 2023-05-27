import CartList from './CartList/CartList';
import TotalPrice from './TotalPrice/TotalPrice';

import * as Styled from './CartPage.styled';

const CartPage = () => {
  return (
    <Styled.PageDiv>
      <Styled.PageHeaing>장바구니</Styled.PageHeaing>
      <Styled.ContentDiv>
        <CartList />
        <TotalPrice />
      </Styled.ContentDiv>
    </Styled.PageDiv>
  );
};

export default CartPage;
