import React from "react";

import { Container, Left, Center, Right } from "./style";
import { ContainerProps } from "./style";

type LoadingProps = ContainerProps;

const Loading = ({ bgColor }: LoadingProps) => (
  <Container bgColor={bgColor}>
    <Left />
    <Center />
    <Right />
  </Container>
);

export default Loading;
export { LoadingProps };
