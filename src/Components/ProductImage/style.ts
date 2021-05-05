import styled from "styled-components";

interface IContainerProps {
  size: string;
}

const Container = styled.div<IContainerProps>`
  ${({ size }) => `width: ${size}; 
    height: ${size};
  `}
  overflow: hidden;
`;

export { Container, IContainerProps };
