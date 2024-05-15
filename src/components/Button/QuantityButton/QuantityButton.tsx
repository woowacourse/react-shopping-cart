/** @jsxImportSource @emotion/react */
import Button from "../Button";
import { SignStyle } from "./QuantityButton.style";

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonType {
  Plus = "plus",
  Minus = "minus",
}

const QuantityButton = ({ type }: { type: ButtonType }) => {
  return (
    <Button fontSize="24px">
      <div css={SignStyle}>{type === ButtonType.Plus ? "+" : "-"}</div>{" "}
    </Button>
  );
};

export default QuantityButton;
