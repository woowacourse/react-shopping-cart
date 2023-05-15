import { useRecoilValue } from 'recoil';

import { cartLengthSelector } from '@recoil/myCartState';

import Text from '@components/commons/Text/Text';
import Button from '@components/commons/Button/Button';

const CartButton = () => {
  const cartLength = useRecoilValue(cartLengthSelector);

  return (
    <Button
      width="28px"
      height="28px"
      borderRadius="50%"
      backgroundColor="#04c09e"
    >
      <Text text={cartLength} color="white" fontSize="16px" />
    </Button>
  );
};

export default CartButton;
