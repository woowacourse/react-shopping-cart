/** @jsxImportSource @emotion/react */
import Button from "../Button";
import { SignStyle } from "./QuantityButton.style";

export type ButtonType = "plus" | "minus";

const QuantityButton = ({ type }: { type: ButtonType }) => {
  return (
    <Button fontSize="24px">
      <div css={SignStyle}>{type === "plus" ? "+" : "-"}</div>{" "}
    </Button>
  );
};

export default QuantityButton;
