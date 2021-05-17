import React, { ReactNode, VFC } from "react";
import { Container, ContainerProps } from "./style";

interface IconProps extends ContainerProps {
  children: ReactNode;
}

const Icon: VFC<IconProps> = ({ size, children }) => (
  <Container size={size} viewBox="0 0 51 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </Container>
);

export default Icon;
export { IconProps };
