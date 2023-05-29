import { memo } from "react";
import Styled from "./ShoppingCardStyled";
import ShoppingInfo from "./ShoppingInfo/ShoppingInfo";
import Checkbox from "../common/Checkbox/Checkbox";

interface ShoppingCardProps {
  cartId: number;
  isChecked: boolean;
  isDelete: boolean;
  onDelete: () => void;
  onChange: () => void;
}

const ShoppingCard = ({
  cartId,
  isChecked,
  isDelete,
  onDelete,
  onChange,
}: ShoppingCardProps) => {
  return (
    <Styled.Container>
      <Checkbox isChecked={isChecked} onChange={onChange} />
      <ShoppingInfo cartId={cartId} isDelete={isDelete} onDelete={onDelete} />
    </Styled.Container>
  );
};

export default memo(ShoppingCard);
