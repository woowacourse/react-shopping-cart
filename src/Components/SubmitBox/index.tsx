import React, { VFC } from "react";

import { Button } from "..";
import { COLOR } from "../../constants/theme";
import { Container, ContainerProps, Main, Title, Desc } from "./style";

interface SubmitBoxProps extends ContainerProps {
  title: string;
  target: {
    name: string;
    value: string;
  };
  buttonName: string;
}

const SubmitBox: VFC<SubmitBoxProps> = ({
  title,
  width,
  height,
  target,
  buttonName,
}) => (
  <Container width={width} height={height}>
    <Title>{title}</Title>
    <Main>
      <Desc>
        <p>{target.name}</p>
        <p>{target.value}</p>
      </Desc>
      <Button
        width="100%"
        height="4.625rem"
        color={COLOR.WHITE}
        fontSize="1.5rem"
        backgroundColor={COLOR.MAIN}
      >
        {buttonName}
      </Button>
    </Main>
  </Container>
);

export default SubmitBox;
export { SubmitBoxProps };
