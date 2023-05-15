import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '@recoil/myCartState';

import {
  StyledCartButtonFlexBox,
  StyledCartLengthFlexBox,
} from '@components/CartButton/CartButton.styled';
import Text from '@components/commons/Text/Text';
import Button from '@components/commons/Button/Button';

const CartButton = () => {
  const cartLength = useRecoilValue(cartLengthSelector);

  return (
    <StyledCartButtonFlexBox>
      <Text text="장바구니" color="white" fontSize="24px" />
      <Button>
        <StyledCartLengthFlexBox>
          <Text text={cartLength} color="white" fontSize="16px" />
        </StyledCartLengthFlexBox>
      </Button>
    </StyledCartButtonFlexBox>
  );
};

export default CartButton;
