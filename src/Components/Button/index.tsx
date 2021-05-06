import React, { ReactNode, FC, MouseEventHandler } from "react";

import { Container, IContainerProps } from "./style";

interface IButtonProps extends IContainerProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<IButtonProps> = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
);

export default Button;
export { IButtonProps };
