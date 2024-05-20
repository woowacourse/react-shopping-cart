import { ButtonStyle } from "./Button.style";

interface ButtonProps {
  width?: string;
  height?: string;
  fontSize?: string;
  isHighlight?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  width = "24px",
  height = "24px",
  fontSize = "12px",
  isHighlight = false,
  onClick,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button css={ButtonStyle(width, height, fontSize, isHighlight)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
