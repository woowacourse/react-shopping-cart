import * as S from './CartContainer.styled';
import CheckBox from '@/shared/components/CheckBox/CheckBox';
import CartList from './CartList/CartList';
import { CartItemType } from '@/apis/cartItems/cartItem.type';
import { useState } from 'react';
import PriceContainer from './PriceContainer/PriceContainer';

type CartContainerProps = {
  cartItems: CartItemType[];
  refetchCartItems: () => Promise<void>;
};

export default function CartContainer({ cartItems, refetchCartItems }: CartContainerProps) {
  const [orderList, setOrderList] = useState<CartItemType[]>(cartItems);
  const cartIds = new Set(cartItems.map((item) => item.id));
  const orderIds = new Set(orderList.map((item) => item.id));
  const isAllChecked = [...cartIds].every((id) => orderIds.has(id));

  const handleAllCheckBoxClick = () => {
    if (isAllChecked) {
      setOrderList([]);
      return;
    }

    setOrderList(cartItems);
  };

  const addOrderItem = (cartItem: CartItemType) => {
    setOrderList((prev) => [...prev, cartItem]);
  };

  const removeOrderItem = (id: number) => {
    const newOrderList = orderList.filter((order) => order.id !== id);
    setOrderList(newOrderList);
  };

  const orderTotalPrice = orderList.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0);

  return (
    <S.Container>
      <S.Text>현재 {cartItems.length}종류의 상품이 담겨있습니다.</S.Text>
      <S.AllCheckBox>
        <CheckBox isChecked={isAllChecked} onClick={handleAllCheckBoxClick} />
        <S.Text>전체 선택</S.Text>
      </S.AllCheckBox>
      <S.ScrollContainer>
        <CartList
          cartItems={cartItems}
          orderList={orderList}
          refetchCartItems={refetchCartItems}
          addOrderItem={addOrderItem}
          removeOrderItem={removeOrderItem}
        />
        <PriceContainer orderTotalPrice={orderTotalPrice} />
      </S.ScrollContainer>
      <S.OrderConfirmButton type="button">주문 확인</S.OrderConfirmButton>
    </S.Container>
  );
}
