/** @jsxImportSource @emotion/react */
import Button from "../Button";
import { SignStyle } from "./QuantityButton.style";

export type ButtonType = "plus" | "minus";

interface QuantityProps {
  type: ButtonType;
  onClick?: () => void;
}

const QuantityButton = ({ type, onClick }: QuantityProps) => {
  return (
    <Button fontSize="24px" onClick={onClick}>
      <div css={SignStyle}>{type === "plus" ? "+" : "-"}</div>{" "}
    </Button>
  );
};

export default QuantityButton;
