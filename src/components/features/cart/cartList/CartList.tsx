import SelectBox from '../../../common/selectBox/SelectBox';
import CartItem from '../cartItem/CartItem';
import * as S from './CartList.styles';
import { useCartSelectionContext } from '../contexts/CartSelectionContext';
import { useCartContext } from '../contexts/CartContext';

function CartList() {
  const selection = useCartSelectionContext();
  const { cartItems, fetch } = useCartContext();

  return (
    <S.Container>
      <S.AllSelectBox>
        <SelectBox
          id="allSelect"
          selected={selection.allSelected}
          onClick={selection.toggleAll}
        />
        <S.AllSelectText htmlFor="allSelect">전체선택</S.AllSelectText>
      </S.AllSelectBox>
      {cartItems.map((cartItem, index) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          selected={selection.selectedList[index]}
          toggle={() => selection.toggle(index)}
          onUpdate={fetch}
        />
      ))}
    </S.Container>
  );
}

export default CartList;
