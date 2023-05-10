import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '../../recoil/myCartState';

import * as Styled from './CartButton.styled';

const CartButton = () => {
  const cartLength = useRecoilValue(cartLengthSelector);
  return (
    <Styled.CartButton>
      <p>장바구니</p>
      <Styled.CartLengthDiv>{cartLength}</Styled.CartLengthDiv>
    </Styled.CartButton>
  );
};

export default CartButton;
