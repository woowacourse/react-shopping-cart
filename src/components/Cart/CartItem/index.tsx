import * as S from './CartItem.styles';
import Counter from 'components/@common/Counter';
import Svg from 'components/@common/Svg';
import { useProductSelect } from 'hooks/useProductSelect';
import { useCheckedItems } from '../hooks/useCheckedItems';
import { Cart } from 'types';

interface CartItemProps {
  cartItem: Cart;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { currentCartItem, remove, add, onDeleteItem } = useProductSelect(
    cartItem.product
  );
  const { checkItem, checkedItems } = useCheckedItems();
  const { product } = cartItem;

  const onCheckBoxChange = () => {
    checkItem(cartItem);
  };

  return (
    <S.CartItemWrapper>
      <S.CheckBox
        type="checkbox"
        onChange={onCheckBoxChange}
        checked={checkedItems.includes(cartItem)}
      />
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
