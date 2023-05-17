import { memo } from "react";
import Styled from "./ShoppingCardStyled";
import ShoppingInfo from "./ShoppingInfo/ShoppingInfo";

interface ShoppingCardProps {
  cartId: number;
}

const ShoppingCard = ({ cartId }: ShoppingCardProps) => {
  return (
    <Styled.Container>
      <Styled.Checkbox type="checkbox"></Styled.Checkbox>
      <ShoppingInfo cartId={cartId} />
    </Styled.Container>
  );
};

export default memo(ShoppingCard);
