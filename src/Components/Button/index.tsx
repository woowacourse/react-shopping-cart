import React, { VFC } from "react";

import { Container, IContainerProps } from "./style";

interface IButtonProps extends IContainerProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: VFC<IButtonProps> = ({ text, ...props }) => (
  <Container {...props}>{text}</Container>
);

export default Button;
export { IButtonProps };
