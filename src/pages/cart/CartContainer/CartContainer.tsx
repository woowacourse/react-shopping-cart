import * as S from './CartContainer.styled';
import CheckBox from '@/shared/components/CheckBox/CheckBox';
import CartList from './CartList/CartList';
import { CartItemType } from '@/apis/cartItems/cartItem.type';
import { useState } from 'react';

type CartContainerProps = {
  cartItems: CartItemType[];
  refetchCartItems: () => Promise<void>;
};

export default function CartContainer({ cartItems, refetchCartItems }: CartContainerProps) {
  const [orderList, setOrderList] = useState<CartItemType[]>(cartItems);
  const isAllChecked = orderList.every((item, idx) => item.id === cartItems[idx].id);

  return (
    <S.Container>
      <S.Text>현재 {cartItems.length}종류의 상품이 담겨있습니다.</S.Text>
      <S.AllCheckBox>
        <CheckBox isChecked={isAllChecked} onClick={() => setOrderList(cartItems)} />
        <S.Text>전체 선택</S.Text>
      </S.AllCheckBox>
      <CartList cartItems={cartItems} refetchCartItems={refetchCartItems} />
    </S.Container>
  );
}
