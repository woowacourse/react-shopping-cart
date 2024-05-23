/** @jsxImportSource @emotion/react */
import { CSSProperties } from "react";
import { ButtonStyle } from "./Button.style";
import { COLOR_PALETTE } from "../../../colorPalette";

interface ButtonProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  border?: CSSProperties["border"];
  isHighlight?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  width = "fit-content",
  height = "24px",
  fontSize = "12px",
  fontWeight = "500",
  border = `1px solid ${COLOR_PALETTE.lightGrey}`,
  isHighlight = false,
  isDisabled = false,
  onClick,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      css={ButtonStyle(width, height, fontSize, fontWeight, border, isHighlight, isDisabled)}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
