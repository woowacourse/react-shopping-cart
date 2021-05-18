import React, { MouseEventHandler, FC } from "react";

import { Button } from "..";
import { COLOR } from "../../constants/theme";
import { DivFlexBetween } from "../../SharedStyled/Flex";
import TextWithHighlight from "../TextWithHighlight";
import { Container, ContainerProps, Main, Title } from "./style";

interface SubmitBoxProps extends ContainerProps {
  title: string;
  target: {
    name: string;
    value: string;
  };
  buttonName: string;
  onClickSubmitButton: MouseEventHandler<HTMLButtonElement>;
}

const SubmitBox: FC<SubmitBoxProps> = ({ title, width, height, target, buttonName, onClickSubmitButton }) => (
  <Container width={width} height={height}>
    <Title>{title}</Title>
    <Main>
      <DivFlexBetween>
        <p>
          <TextWithHighlight
            highlightColor={COLOR.MAIN}
            text={target.name}
            fontSize="1.25rem"
            color={COLOR.GRAY_600}
            fontWeight="700"
          />
        </p>
        <p>
          <TextWithHighlight
            highlightColor={COLOR.MAIN}
            text={target.value}
            fontSize="1.25rem"
            color={COLOR.GRAY_600}
            fontWeight="700"
          />
        </p>
      </DivFlexBetween>
      <Button
        width="100%"
        height="4.625rem"
        color={COLOR.WHITE}
        fontSize="1.5rem"
        backgroundColor={COLOR.MAIN}
        onClick={onClickSubmitButton}
      >
        {buttonName}
      </Button>
    </Main>
  </Container>
);

export default SubmitBox;
export { SubmitBoxProps };
