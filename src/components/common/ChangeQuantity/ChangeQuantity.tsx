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
      <Button size="s" onClick={decreaseQuantity} isSquare={true} disabled={quantity === 1} aria-label="수량 감소">
        <img src={MINUS} />
      </Button>
      <S.Quantity>
        <Text weight="m">{quantity}</Text>
      </S.Quantity>
      <Button size="s" onClick={increaseQuantity} isSquare={true} aria-label="수량 증가">
        <img src={PLUS} />
      </Button>
    </S.ChangeQuantity>
  );
};

export default ChangeQuantity;
