import * as S from './ChangeQuantity.style';

import Button from '../Button/Button';

import PLUS from '../../../assets/plus.svg';
import MINUS from '../../../assets/minus.svg';
import Text from '../Text/Text';

export interface ChangeQuantityProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

const ChangeQuantity = ({ quantity, decreaseQuantity, increaseQuantity }: ChangeQuantityProps) => {
  return (
    <S.ChangeQuantity>
      <Button size="s" onClick={decreaseQuantity} square={true} isDisabled={quantity === 1} aria-label="minus">
        <img src={MINUS} alt='minus-image' />
      </Button>
      <S.Quantity>
        <Text weight="m">{quantity}</Text>
      </S.Quantity>
      <Button size="s" onClick={increaseQuantity} square={true} aria-label="plus">
        <img src={PLUS} alt='plus-image' />
      </Button>
    </S.ChangeQuantity>
  );
};

export default ChangeQuantity;
