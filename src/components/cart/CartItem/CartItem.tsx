import { CloseIcon } from '../../../assets';
import { useCount } from '../../../hooks/useCount';
import { CartItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import StepperButton from '../../common/StepperButton/StepperButton';
import * as S from './CartItem.styles';

interface CartItemProps extends CartItemData {}

const CartItem = ({ quantity, product }: CartItemProps) => {
  const { count, handleDecreaseCount, handleIncreaseCount, handleCountChange } = useCount(quantity);

  return (
    <S.CartItemContainer>
      <S.CartItemImageWrapper>
        <S.CartItemImage src={product.imageUrl} alt={product.name} loading="lazy" />
      </S.CartItemImageWrapper>
      <S.CartItemName>{product.name}</S.CartItemName>
      <StepperButton
        count={count}
        handleDecreaseCount={handleDecreaseCount}
        handleIncreaseCount={handleIncreaseCount}
        handleCountChange={handleCountChange}
      />
      <S.CartItemPrice>{priceFormatter(product.price * count)}원</S.CartItemPrice>
      <S.CartItemDeleteButton variant="textButton">
        <CloseIcon />
      </S.CartItemDeleteButton>
    </S.CartItemContainer>
  );
};

export default CartItem;
