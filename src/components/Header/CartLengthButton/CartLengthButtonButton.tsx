import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '@recoil/myCartState';

import * as Text from '@components/commons/Text/Text';
import { Button as CircleButton } from '@components/commons/Button/Button';

const CartLengthButton = () => {
  const cartLength = useRecoilValue(cartLengthSelector);

  return (
    <CircleButton
      width="28px"
      height="28px"
      borderRadius="50%"
      backgroundColor="#04c09e"
    >
      <Text.Description color="white">{cartLength}</Text.Description>
    </CircleButton>
  );
};

export default CartLengthButton;
