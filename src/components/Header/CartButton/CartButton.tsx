import { useRecoilValue } from 'recoil';

import * as Styled from './CartButton.styled';
import { localCartLengthSelector } from '../../../recoil/cartToggleState';

const CartButton = () => {
  const cartLength = useRecoilValue(localCartLengthSelector);

  return (
    <Styled.CartButton>
      <p>장바구니</p>
      <Styled.CartLengthDiv>{cartLength}</Styled.CartLengthDiv>
    </Styled.CartButton>
  );
};

export default CartButton;
