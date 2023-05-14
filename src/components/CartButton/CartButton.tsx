import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '@recoil/myCartState';

import {
  StyledCartButtonFlexBox,
  StyledCartLengthDiv,
} from '@components/CartButton/CartButton.styled';
import Button from '@components/commons/Button/Button';

const CartButton = () => {
  const cartLength = useRecoilValue(cartLengthSelector);

  return (
    <StyledCartButtonFlexBox>
      <p>장바구니</p>
      <Button>
        <StyledCartLengthDiv>{cartLength}</StyledCartLengthDiv>
      </Button>
    </StyledCartButtonFlexBox>
  );
};

export default CartButton;
