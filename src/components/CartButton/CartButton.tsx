import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '../../recoil/myCartState';

import { StyledCartButton, StyledCartLengthDiv } from './CartButton.styled';

const CartButton = () => {
  const cartLength = useRecoilValue(cartLengthSelector);
  return (
    <StyledCartButton>
      <p>장바구니</p>
      <StyledCartLengthDiv>{cartLength}</StyledCartLengthDiv>
    </StyledCartButton>
  );
};

export default CartButton;
