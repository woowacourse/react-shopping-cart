import React from 'react';
import CartItem from '../CartItem';
import * as S from './CartList.styles';
import Button from '../../common/Button';
import Flex from '../../common/Flex';
import useCart from '../../../hooks/cart/useCart';
import { useRecoilState } from 'recoil';
import { checkedItemIdList } from '../../../recoil/cart';

const CartList = () => {
  const { cartItems, deleteInCart } = useCart();
  const [checkedList, setCheckedList] = useRecoilState(checkedItemIdList);

  const deleteAllItems = () => {
    cartItems.forEach((item) => {
      deleteInCart(item.id);
    });
    setCheckedList([]);
  };

  const toggleAllCheckedState = () => {
    if (checkedList.length === cartItems.length) {
      setCheckedList([]);
      return;
    }

    setCheckedList(cartItems.map((item) => item.id));
  };

  return (
    <S.Container>
      <S.Title>든든 배송 상품 ( {cartItems.length}개 )</S.Title>
      {!cartItems.length ? (
        <S.EmptyList>장바구니에 담긴 상품이 없습니다.</S.EmptyList>
      ) : (
        <S.CartList>
          {cartItems.map((item) => (
            <li key={item.id}>
              <CartItem {...item} />
            </li>
          ))}
        </S.CartList>
      )}
      <Flex width="100%" justify="space-between" align="center">
        <S.SelectAll>
          <S.CheckBox
            type="checkbox"
            onChange={toggleAllCheckedState}
            checked={
              cartItems.length === checkedList.length && !!cartItems.length
            }
          />
          전체 선택 ( {checkedList.length} / {cartItems.length} )
        </S.SelectAll>
        <Button size="S" view="light" onClick={deleteAllItems}>
          전체 삭제
        </Button>
      </Flex>
    </S.Container>
  );
};

export default CartList;
