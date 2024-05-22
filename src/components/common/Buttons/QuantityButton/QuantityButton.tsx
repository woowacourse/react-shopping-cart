/** @jsxImportSource @emotion/react */
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

import Button from "../Button";

export type ButtonType = "plus" | "minus" | "canDelete";

interface QuantityProps {
  type: ButtonType;
  onClick?: () => void;
}

const QuantityButton = ({ type, onClick }: QuantityProps) => {
  const buttonMap = {
    plus: <HiOutlinePlus size={16} />,
    minus: <HiOutlineMinus size={16} />,
    canDelete: <MdDelete size={16} />,
  };

  return (
    <Button width="24px" fontSize="24px" onClick={onClick}>
      {buttonMap[type]}
    </Button>
  );
};

export default QuantityButton;
