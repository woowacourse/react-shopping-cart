import SelectBox from '../../../common/selectBox/SelectBox';
import CartItem from '../cartItem/CartItem';
import * as S from './CartList.styles';
import { CartItemType } from '../types';

interface CartListProps {
  cartItems: CartItemType[];
  isSelectedList: boolean[];
  toggleSelect: (index: number) => void;
  refetch: () => Promise<void>;
}

function CartList({
  cartItems,
  isSelectedList,
  toggleSelect,
  refetch,
}: CartListProps) {
  return (
    <S.Container>
      <S.AllSelectBox>
        <SelectBox id="allSelect" isSelected={true} />
        <S.AllSelectText htmlFor="allSelect">전체선택</S.AllSelectText>
      </S.AllSelectBox>
      {cartItems.map((cartItem, index) => (
        <CartItem
          cartItem={cartItem}
          isSelected={isSelectedList[index]}
          toggleSelect={() => toggleSelect(index)}
          refetch={refetch}
        />
      ))}
    </S.Container>
  );
}

export default CartList;
