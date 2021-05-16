import styled from "styled-components";
import { COLOR } from "../../../constants/theme";
import { FlexBetween } from "../../../SharedStyled/Flex";

interface ContainerProps {
  width: string;
  height: string;
}

const Container = styled.div<ContainerProps>`
  position: sticky;
  top: 4px;
  ${({ width, height }) => `
    width: ${width};
    height: ${height};
  `}
  border: 1px solid ${COLOR.GRAY_100};
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25%;
  font-size: 1.5rem;
  padding: 1.25rem 1.9rem;
  border-bottom: 1px solid ${COLOR.GRAY_100};
`;

const Main = styled(FlexBetween("div"))`
  flex-direction: column;
  width: 100%;
  height: 75%;
  padding: 1.25rem 1.9rem;
`;

export { Container, Title, Main, ContainerProps };
