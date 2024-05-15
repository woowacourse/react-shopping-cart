import * as S from './styled';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';

interface SetQuantityProps {
  quantity: number;
  handleIncrement: () => Promise<void>;
  handleDecrement: () => Promise<void>;
}

const SetQuantity = ({ quantity, handleIncrement, handleDecrement }: SetQuantityProps) => {
  return (
    <S.Container>
      <S.Button onClick={handleDecrement}>
        <S.Image src={minus} alt="" />
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button onClick={handleIncrement}>
        <S.Image src={plus} alt="" />
      </S.Button>
    </S.Container>
  );
};

export default SetQuantity;
