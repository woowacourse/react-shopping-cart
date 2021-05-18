import React, { ReactNode, FC, ButtonHTMLAttributes } from "react";

import { Container, ContainerProps } from "./style";

interface ButtonProps extends ContainerProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => <Container {...props}>{children}</Container>;

export default Button;
export { ButtonProps };
