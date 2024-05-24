import * as S from './CartItemList.style';
import CartItem from '../CartItem/CartItem';
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel';
import { useSelectedCartItemIdList } from '../../hooks/cartItem/useSelectedCartItemIdList';

interface CartItemListProp {
  type?: 'cart' | 'confirm';
  cartItemList: CartItem[];
}

const CartItemList = ({ type = 'cart', cartItemList }: CartItemListProp) => {
  const { isSelectedAll, unselectAll, selectAll } = useSelectedCartItemIdList();

  return (
    <S.CartItemList>
      {type === 'cart' ? (
        <CheckboxWithLabel
          isChecked={isSelectedAll}
          onClick={isSelectedAll ? unselectAll : selectAll}
          labelText="전체선택"
        />
      ) : null}
      {cartItemList.map((cartItem: CartItem) => {
        return <CartItem type={type} key={cartItem.id} cartItem={cartItem} />;
      })}
    </S.CartItemList>
  );
};

export default CartItemList;
