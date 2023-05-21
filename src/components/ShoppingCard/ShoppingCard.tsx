import { memo } from "react";
import Styled from "./ShoppingCardStyled";
import ShoppingInfo from "./ShoppingInfo/ShoppingInfo";
import Checkbox from "../common/Checkbox/Checkbox";

interface ShoppingCardProps {
  cartId: number;
  isChecked: boolean;
  isDeleted: boolean;
  deleteChecked: () => void;
  changeIsChecked: () => void;
}

const ShoppingCard = ({
  cartId,
  isChecked,
  isDeleted,
  changeIsChecked,
  deleteChecked,
}: ShoppingCardProps) => {
  return (
    <Styled.Container>
      <Checkbox isChecked={isChecked} onChange={changeIsChecked} />
      <ShoppingInfo
        cartId={cartId}
        isDeleted={isDeleted}
        deleteChecked={deleteChecked}
      />
    </Styled.Container>
  );
};

export default memo(ShoppingCard);
