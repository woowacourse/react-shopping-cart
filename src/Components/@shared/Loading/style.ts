import styled, { keyframes } from "styled-components";
import { FlexCenter } from "../../../SharedStyled/Flex";

const loadingAnimation = keyframes`
  from {
    transform:scale(1,1)
  }
  50% {
    transform:scale(1,1.8)
  }
  to {
    transform:scale(1,1)
  }
`;
interface ContainerProps {
  bgColor: string;
}

const Container = styled(FlexCenter("div"))<ContainerProps>`
  width: 100%;

  div {
    width: 10px;
    height: 40px;
    background-color: ${({ bgColor }) => `${bgColor};`};
  }

  div:not(:last-child) {
    margin-right: 10px;
  }
`;

const Left = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: -0.16s;
`;

const Center = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
`;

const Right = styled.div`
  animation: ${loadingAnimation} 1s infinite ease-in-out;
  animation-delay: 0.16s;
`;

export { Container, Left, Center, Right };
export { ContainerProps };
