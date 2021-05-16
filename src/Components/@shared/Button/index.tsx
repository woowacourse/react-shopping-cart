import React, { ReactNode, FC, MouseEventHandler, ButtonHTMLAttributes } from "react";

import { Container } from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => <Container {...props}>{children}</Container>;

export default Button;
export { ButtonProps };
