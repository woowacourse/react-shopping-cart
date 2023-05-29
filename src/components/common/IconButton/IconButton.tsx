import { ButtonHTMLAttributes } from "react";
import Styled from "./IconButtonStyled";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton = ({ children, ...props }: IconButtonProps) => {
  return <Styled.Button {...props}>{children}</Styled.Button>;
};

export default IconButton;
