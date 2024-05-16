import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { cartItemsState } from "../../recoil/selectors/selectors";

const CartDescription = () => {
  const cartItemsLength = useRecoilValue(cartItemsState).length;

  return (
    <Wrapper>
      <div>현재 {cartItemsLength}종류의 상품이 담겨있습니다.</div>
    </Wrapper>
  );
};

export default CartDescription;

const Wrapper = styled.div`
  margin-bottom: 36px;
`;
