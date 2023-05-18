import type { CartItemType } from '../../../types';
import styled from 'styled-components';

import Product from '../../leafs/Product/Product';
import CartItem from '../../leafs/CartItem/CartItem';
import CheckBox from '../../leafs/CheckBox/CheckBox';

interface CartListProps {
  cartItems: CartItemType[];
}

export default function CartList({ cartItems }: CartListProps) {
  return (
    <S.Wrapper>
      <Title>배송 상품 ({cartItems.length}개)</Title>
      <Container>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item}></CartItem>
        ))}
      </Container>
      <CheckWrapper>
        <CheckBox />
        <Direction>전체선택 (2/3)</Direction>
        <CheckDeleteButton>선택삭제</CheckDeleteButton>
      </CheckWrapper>
    </S.Wrapper>
  );
}

const Wrapper = styled.div`
  width: 740px;

  display: flex;
  flex-direction: column;
  jusify-content: start;
  gap: 20px;

  @media screen and (max-width: 767px) {
    width: 320px;
  }
`;

const Title = styled.div`
  font-size: 18px;

  padding: 20px 5px;

  border-bottom: 3px solid gray;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

const CheckWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
`;

const Direction = styled.p`
  font-size: 14px;
`;

const CheckDeleteButton = styled.button`
  background-color: white;
  border: 1px solid #bbbbbb;

  padding: 7px;
`;

const S = {
  Wrapper,
};
