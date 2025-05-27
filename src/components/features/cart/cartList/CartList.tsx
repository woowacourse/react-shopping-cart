import { useState } from 'react';
import SelectBox from '../../../common/selectBox/SelectBox';
import CartItem from '../cartItem/CartItem';
import * as S from './CartList.styles';
import { CartItemType } from '../types';

interface CartListProps {
  cartItems: CartItemType[];
  refetch: () => Promise<void>;
}

function CartList({ cartItems, refetch }: CartListProps) {
  const [isSelectedList, setIsSelectedList] = useState([false, false]);

  const toggleSelect = (toggleIndex: number) => {
    setIsSelectedList(
      isSelectedList.map((isSelected, index) =>
        toggleIndex === index ? !isSelected : isSelected
      )
    );
  };
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
