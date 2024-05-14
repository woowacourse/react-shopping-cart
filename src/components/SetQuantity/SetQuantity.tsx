import * as S from './styled';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';

interface SetQuantityProps {
  quantity: number;
  onClick: {
    plus: () => void;
    minus: () => void;
  };
}

const SetQuantity = ({ quantity, onClick }: SetQuantityProps) => {
  return (
    <S.Container>
      <S.Button onClick={onClick.minus}>
        <S.Image src={minus} alt="" />
      </S.Button>
      <S.Quantity>{quantity}</S.Quantity>
      <S.Button onClick={onClick.plus}>
        <S.Image src={plus} alt="" />
      </S.Button>
    </S.Container>
  );
};

export default SetQuantity;
