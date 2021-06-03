import React from "react";

import { Container, Left, Center, Right } from "./style";
import { ContainerProps } from "./style";

import { COLOR } from "../../../constants/theme";

type LoadingProps = Partial<ContainerProps>;

const Loading = ({ bgColor = COLOR.MAIN }: LoadingProps) => (
  <Container bgColor={bgColor}>
    <Left />
    <Center />
    <Right />
  </Container>
);

export default Loading;
export { LoadingProps };
