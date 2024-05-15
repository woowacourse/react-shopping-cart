import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { cartItems } from "../../recoil/selectors/selectors";

const CartDescription = () => {
  const cartItemLength = useRecoilValue(cartItems).length;
  return (
    <Wrapper>
      <Title>장바구니</Title>
      {cartItemLength && (
        <div>현재 {cartItemLength}종류의 상품이 담겨있습니다.</div>
      )}
    </Wrapper>
  );
};

export default CartDescription;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 36px;
  font-weight: var(--font-weight-medium);
`;

const Title = styled.div`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: 35px;
`;
