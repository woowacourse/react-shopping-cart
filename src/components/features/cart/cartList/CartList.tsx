import SelectBox from '../../../common/selectBox/SelectBox';
import CartItem from '../cartItem/CartItem';
import * as S from './CartList.styles';
import { CartItemType } from '../types';

interface CartListProps {
  cartItems: CartItemType[];
  selectedCartItemIds: number[];
  isAllItemSelected: boolean;
  toggleSelect: (index: number) => void;
  toggleAllSelect: () => void;
}

function CartList({
  cartItems,
  selectedCartItemIds,
  isAllItemSelected,
  toggleSelect,
  toggleAllSelect,
}: CartListProps) {
  return (
    <S.Container>
      <S.AllSelectBox>
        <SelectBox
          id="allSelect"
          selected={isAllItemSelected}
          onClick={toggleAllSelect}
        />
        <S.AllSelectText htmlFor="allSelect">전체선택</S.AllSelectText>
      </S.AllSelectBox>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          isSelected={selectedCartItemIds.includes(cartItem.id)}
          toggleSelect={() => toggleSelect(cartItem.id)}
        />
      ))}
    </S.Container>
  );
}

export default CartList;
