import * as S from './CartItem.styles';
import { useRecoilState } from 'recoil';
import { checkedItemsIdAtom } from 'recoil/cartList';
import Counter from 'components/@common/Counter';
import Svg from 'components/@common/Svg';
import { useProductSelect } from 'hooks/useProductSelect';
import { Cart } from 'types';

const CartItem = ({ cartItem }: { cartItem: Cart }) => {
  const { currentCartItem, remove, add, onDeleteItem } = useProductSelect(
    cartItem.product
  );
  const [checkedItems, setCheckedItems] = useRecoilState(checkedItemsIdAtom);
  const { product } = cartItem;

  const onCheckBoxChange = () => {
    if (checkedItems.includes(cartItem.id)) {
      setCheckedItems((prev) => prev.filter((id) => id !== cartItem.id));
      return;
    }
    setCheckedItems((prev) => [...prev, cartItem.id]);
  };

  return (
    <S.CartItemWrapper>
      <S.CheckBox
        type="checkbox"
        onChange={onCheckBoxChange}
        checked={checkedItems.includes(cartItem.id)}
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
