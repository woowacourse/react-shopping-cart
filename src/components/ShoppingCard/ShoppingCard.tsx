import { memo } from "react";
import Styled from "./ShoppingCardStyled";
import ShoppingInfo from "./ShoppingInfo/ShoppingInfo";
import Checkbox from "../common/Checkbox/Checkbox";

interface ShoppingCardProps {
  cartId: number;
  isChecked: boolean;
  changeIsChecked: () => void;
}

const ShoppingCard = ({
  cartId,
  isChecked,
  changeIsChecked,
}: ShoppingCardProps) => {
  return (
    <Styled.Container>
      <Checkbox isChecked={isChecked} onChange={changeIsChecked} />
      <ShoppingInfo cartId={cartId} />
    </Styled.Container>
  );
};

export default memo(ShoppingCard);
