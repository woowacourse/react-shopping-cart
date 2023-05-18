import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../../recoil/cart';
import CartItem from '../CartItem';
import * as S from './CartList.styles';
import Button from '../../common/Button';
import Flex from '../../common/Flex';

const CartList = () => {
  const cartItems = useRecoilValue(cartState);

  return (
    <S.Container>
      <S.Title>든든 배송 상품 ( {cartItems.length}개 )</S.Title>
      <S.CartList>
        {cartItems.map((item) => (
          <li key={item.id}>
            <CartItem {...item} />
          </li>
        ))}
      </S.CartList>
      <Flex width="100%" justify="space-between" align="center">
        <S.SelectAll>
          <S.CheckBox type="checkbox" />
          전체 선택
        </S.SelectAll>
        <Button size="S" view="light">
          전체 삭제
        </Button>
      </Flex>
    </S.Container>
  );
};

export default CartList;
