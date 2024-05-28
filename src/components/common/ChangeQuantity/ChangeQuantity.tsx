import Text from '../Text/Text';
import Button from '../Button/Button';
import * as S from './ChangeQuantity.style';
import PLUS from '../../../assets/plus.svg?react';
import MINUS from '../../../assets/minus.svg?react';

export interface ChangeQuantityProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

const ChangeQuantity = ({
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: ChangeQuantityProps) => {
  return (
    <S.ChangeQuantity>
      <Button
        size="s"
        onClick={decreaseQuantity}
        square={true}
        isDisabled={quantity === 1}
        aria-label="minus"
      >
        <MINUS />
      </Button>
      <S.Quantity>
        <Text weight="m">{quantity}</Text>
      </S.Quantity>
      <Button
        size="s"
        onClick={increaseQuantity}
        square={true}
        aria-label="plus"
      >
        <PLUS />
      </Button>
    </S.ChangeQuantity>
  );
};

export default ChangeQuantity;
