import { useRecoilValue } from 'recoil';

import { cartItemsLengthSelector } from '@recoil/selector';

import * as Text from '@components/commons/Text/Text';
import { StyledCircleBox } from './CartLengthBox.styled';

const CartLengthBox = () => {
  const cartItemsLength = useRecoilValue(cartItemsLengthSelector);

  return (
    <StyledCircleBox>
      <Text.Description color="white">{cartItemsLength}</Text.Description>
    </StyledCircleBox>
  );
};

export default CartLengthBox;
