import { memo } from "react";
import Styled from "./ShoppingCardStyled";
import ShoppingInfo from "./ShoppingInfo/ShoppingInfo";
import Checkbox from "../common/Checkbox/Checkbox";

interface ShoppingCardProps {
  cartId: number;
  isChecked: boolean;
  isDelete: boolean;
  deleteChecked: () => void;
  changeIsChecked: () => void;
}

const ShoppingCard = ({
  cartId,
  isChecked,
  isDelete,
  deleteChecked,
  changeIsChecked,
}: ShoppingCardProps) => {
  return (
    <Styled.Container>
      <Checkbox isChecked={isChecked} onChange={changeIsChecked} />
      <ShoppingInfo
        cartId={cartId}
        isDelete={isDelete}
        deleteChecked={deleteChecked}
      />
    </Styled.Container>
  );
};

export default memo(ShoppingCard);
