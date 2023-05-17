import { memo } from "react";
import Styled from "./ShoppingTitleStyled";

const ShoppingTitle = () => {
  return (
    <Styled.Container>
      <Styled.Title>장바구니</Styled.Title>
      <Styled.Border />
    </Styled.Container>
  );
};

export default memo(ShoppingTitle);
