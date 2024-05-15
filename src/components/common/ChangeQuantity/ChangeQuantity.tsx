import * as S from './ChangeQuantity.style';

import Button from '../Button/Button';

import PLUS from '../../../assets/plus.svg';
import MINUS from '../../../assets/minus.svg';
import Text from '../Text/Text';

interface ChangeQuantityProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

const ChangeQuantity = ({ quantity, decreaseQuantity, increaseQuantity }: ChangeQuantityProps) => {
  return (
    <S.ChangeQuantity>
      <Button size="s" onClick={decreaseQuantity} square={true}>
        <img src={MINUS} />
      </Button>
      <S.Quantity>
        <Text weight="m">{quantity}</Text>
      </S.Quantity>
      <Button size="s" onClick={increaseQuantity} square={true}>
        <img src={PLUS} />
      </Button>
    </S.ChangeQuantity>
  );
};

export default ChangeQuantity;
