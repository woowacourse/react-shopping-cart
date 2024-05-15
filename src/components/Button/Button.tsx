/** @jsxImportSource @emotion/react */
import { ButtonStyle } from "./Button.style";

interface ButtonProps {
  width?: string;
  height?: string;
  fontSize?: string;
}

const Button = ({
  children,
  width = "24px",
  height = "24px",
  fontSize = "12px",
}: React.PropsWithChildren<ButtonProps>) => {
  return <button css={ButtonStyle(width, height, fontSize)}>{children}</button>;
};

export default Button;
