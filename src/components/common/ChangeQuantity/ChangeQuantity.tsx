import * as S from './ChangeQuantity.style';

import Button from '../Button/Button';

import PLUS from '../../../assets/plus.svg';
import MINUS from '../../../assets/minus.svg';
import Text from '../Text/Text';

interface ChangeQuantityProps {
  quantity: number;
  decreaseValue: () => void;
  increaseValue: () => void;
}

const ChangeQuantity = ({ quantity, decreaseValue, increaseValue }: ChangeQuantityProps) => {
  return (
    <S.ChangeQuantity>
      <Button size="s" onClick={decreaseValue} square={true}>
        <img src={MINUS} />
      </Button>
      <S.Quantity>
        <Text weight="m">{quantity}</Text>
      </S.Quantity>
      <Button size="s" onClick={increaseValue} square={true}>
        <img src={PLUS} />
      </Button>
    </S.ChangeQuantity>
  );
};

export default ChangeQuantity;
