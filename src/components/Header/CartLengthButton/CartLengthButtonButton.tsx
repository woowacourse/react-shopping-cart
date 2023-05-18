import { useRecoilValue } from 'recoil';

import { cartItemsLengthSelector } from '@recoil/cartState';

import * as Text from '@components/commons/Text/Text';
import { Button as CircleButton } from '@components/commons/Button/Button';

const CartLengthButton = () => {
  const cartItemsLength = useRecoilValue(cartItemsLengthSelector);

  return (
    <CircleButton
      width="28px"
      height="28px"
      borderRadius="50%"
      backgroundColor="#04c09e"
    >
      <Text.Description color="white">{cartItemsLength}</Text.Description>
    </CircleButton>
  );
};

export default CartLengthButton;
