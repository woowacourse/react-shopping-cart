import SelectBox from '../../../common/selectBox/SelectBox';
import CartItem from '../cartItem/CartItem';
import * as S from './CartList.styles';
import { CartItemType } from '../types';

interface CartListProps {
  cartItems: CartItemType[];
  isSelectedList: boolean[];
  isAllSelected: boolean;
  toggleSelect: (index: number) => void;
  toggleAllSelect: () => void;
  refetch: () => Promise<void>;
}

function CartList({
  cartItems,
  isSelectedList,
  isAllSelected,
  toggleSelect,
  toggleAllSelect,
  refetch,
}: CartListProps) {
  return (
    <S.Container>
      <S.AllSelectBox>
        <SelectBox
          id="allSelect"
          isSelected={isAllSelected}
          onClick={toggleAllSelect}
        />
        <S.AllSelectText htmlFor="allSelect">전체선택</S.AllSelectText>
      </S.AllSelectBox>
      {cartItems.map((cartItem, index) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          isSelected={isSelectedList[index]}
          toggleSelect={() => toggleSelect(index)}
          onUpdate={refetch}
        />
      ))}
    </S.Container>
  );
}

export default CartList;
