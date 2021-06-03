import styled from "styled-components";

import { FlexCenter } from "../../../sharedStyled/Flex";
import { COLOR } from "../../../constants/theme";

interface ContainerProps {
  opacity: number;
}

const Container = styled(FlexCenter("div"))<ContainerProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ opacity }) => opacity};

  transition: opacity 0.5s;

  p {
    text-align: center;
    color: ${COLOR.WHITE};
  }
`;

const Inner = styled(FlexCenter("div"))`
  flex-direction: column;
`;

const RoundContainer = styled(FlexCenter("div"))`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${COLOR.WHITE};
  margin: 30px 0;
`;

export { Container, Inner, RoundContainer };
