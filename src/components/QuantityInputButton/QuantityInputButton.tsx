import * as S from './style';
import CartImage from '../../assets/images/cart.png';

interface QuantityInputButtonProps {
  quantity: number;
}

const QuantityInputButton = ({ quantity }: QuantityInputButtonProps) => {
  return quantity === 0 ? (
    <S.CartIcon src={CartImage}></S.CartIcon>
  ) : (
    <S.Container>
      <S.QuantityInput type="number" value={quantity} />
      <S.ButtonWrapper>
        <S.QuantityButton disabled={quantity >= 99}>▲</S.QuantityButton>
        <S.QuantityButton disabled={quantity <= 0}>▼</S.QuantityButton>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default QuantityInputButton;
