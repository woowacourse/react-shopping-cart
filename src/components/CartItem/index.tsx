import * as S from './CartItem.styles';
import Counter from 'components/@common/Counter';
import { useProductSelect } from 'hooks/useProductSelect';
import { Cart } from 'types';
import Svg from 'components/@common/Svg';

const CartItem = ({ cartItem }: { cartItem: Cart }) => {
  const { currentCartItem, remove, add, onDeleteItem } = useProductSelect(
    cartItem.product
  );
  const { product } = cartItem;

  return (
    <S.CartItemWrapper>
      <S.CheckBox type="checkbox" />
      <S.CartItemImage src={product.imageUrl} alt={product.name} />
      <S.CartProductName>{product.name}</S.CartProductName>
      <S.CounterWrapper>
        <button onClick={onDeleteItem}>
          <Svg type="trash-can" width={24} height={24} />
        </button>
        <Counter
          count={currentCartItem?.quantity || 0}
          min={1}
          increment={add}
          decrement={remove}
        />
        <S.CartProductPrice>
          {product.price.toLocaleString('KR')}원
        </S.CartProductPrice>
      </S.CounterWrapper>
    </S.CartItemWrapper>
  );
};

export default CartItem;
