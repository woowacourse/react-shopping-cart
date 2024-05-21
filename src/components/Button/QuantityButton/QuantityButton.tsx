import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import Button from "@/components/Button/Button";

export type ButtonType = "plus" | "minus";

interface QuantityProps {
  type: ButtonType;
  onClick?: () => void;
}

const QuantityButton = ({ type, onClick }: QuantityProps) => {
  return (
    <Button fontSize="24px" onClick={onClick}>
      {type === "plus" ? <HiOutlinePlus size={16} /> : <HiOutlineMinus size={16} />}
    </Button>
  );
};

export default QuantityButton;
