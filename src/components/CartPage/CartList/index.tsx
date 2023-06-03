import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import * as S from './CartList.styles';
import Button from '../../common/Button';
import Flex from '../../common/Flex';
import useCart from '../../../hooks/cart/useCart';
import useCheckedIdCart from '../../../hooks/cart/useCheckedIdCart';

const CartList = () => {
  const { cartItems, emptyCart } = useCart();
  const {
    checkedItemIds,
    toggleAllCheckedState,
    checkAllItemIds,
    emptyCheckedItemIds,
  } = useCheckedIdCart();

  useEffect(() => {
    checkAllItemIds(cartItems);
  }, []);

  const deleteAll = () => {
    const yes = confirm('장바구니를 비우시겠습니까?');

    if (yes) {
      emptyCart();
      emptyCheckedItemIds();
    }
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
            onChange={() => toggleAllCheckedState(cartItems)}
            checked={
              cartItems.length === checkedItemIds.length && !!cartItems.length
            }
          />
          전체 선택 ( {checkedItemIds.length} / {cartItems.length} )
        </S.SelectAll>
        <Button size="S" view="light" onClick={deleteAll}>
          전체 삭제
        </Button>
      </Flex>
    </S.Container>
  );
};

export default CartList;
