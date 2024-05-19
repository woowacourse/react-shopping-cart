import { ORDER } from '../../constants/constants';

import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import disabledMinus from '../../assets/disabledMinus.svg';

import * as S from './styled';

interface SetQuantityProps {
  quantity: number;
  handleIncrement: () => Promise<void>;
  handleDecrement: () => Promise<void>;
}

const SetQuantity = ({ quantity, handleIncrement, handleDecrement }: SetQuantityProps) => {
  return (
    <S.Container>
      <S.Button onClick={handleDecrement} disabled={quantity <= ORDER.MINIMUM_QUANTITY}>
        {quantity > ORDER.MINIMUM_QUANTITY ? (
          <S.Image src={minus} alt="" />
        ) : (
          <S.Image src={disabledMinus} alt="" />
        )}
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button onClick={handleIncrement}>
        <S.Image src={plus} alt="" />
      </S.Button>
    </S.Container>
  );
};

export default SetQuantity;
