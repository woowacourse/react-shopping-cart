import React, { ReactNode, FC } from "react";

import { Container, IContainerProps } from "./style";

interface IButtonProps extends IContainerProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<IButtonProps> = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
);

export default Button;
export { IButtonProps };
