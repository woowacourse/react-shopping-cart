import SelectBox from '../../../common/selectBox/SelectBox';
import CartItem from '../cartItem/CartItem';
import * as S from './CartList.styles';
import { CartItemType } from '../types';

interface CartListProps {
  cartItems: CartItemType[];
  selectedList: boolean[];
  allSelected: boolean;
  toggle: (index: number) => void;
  toggleAll: () => void;
  refetch: () => Promise<void>;
}

function CartList({
  cartItems,
  selectedList,
  allSelected,
  toggle,
  toggleAll,
  refetch,
}: CartListProps) {
  return (
    <S.Container>
      <S.AllSelectBox>
        <SelectBox id="allSelect" selected={allSelected} onClick={toggleAll} />
        <S.AllSelectText htmlFor="allSelect">전체선택</S.AllSelectText>
      </S.AllSelectBox>
      {cartItems.map((cartItem, index) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          selected={selectedList[index]}
          toggle={() => toggle(index)}
          onUpdate={refetch}
        />
      ))}
    </S.Container>
  );
}

export default CartList;
