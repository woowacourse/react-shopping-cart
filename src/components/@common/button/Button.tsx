import { buttonSize, buttonColor, buttonDefaultStyle } from "./Button.styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "smallBlack" | "largeBlack";
  size?: "small" | "large";
  color?: "black" | "white";
}

const Button = ({
  size = "small",
  color = "black",
  children,
  ...props
}: ButtonProps) => {
  const sizeStyle = buttonSize[size];
  const colorStyle = buttonColor[color];
  return (
    <button css={[buttonDefaultStyle, sizeStyle, colorStyle]} {...props}>
      {children}
    </button>
  );
};

export default Button;
