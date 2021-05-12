import React, { ReactNode, FC, MouseEventHandler } from "react";

import { Container, ContainerProps } from "./style";

interface ButtonProps extends ContainerProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => <Container {...props}>{children}</Container>;

export default Button;
export { ButtonProps };
