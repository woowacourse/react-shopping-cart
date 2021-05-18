import styled from "styled-components";

interface ContainerProps {
  width: string;
  height: string;
  color: string;
  fontSize: string;
  backgroundColor: string;
  border?: string;
}

const Container = styled.button<ContainerProps>`
  ${({ width, height, color, fontSize, backgroundColor, border }) => `
      width: ${width}; 
      height: ${height}; 
      color: ${color};
      font-size:${fontSize};
      background-color: ${backgroundColor};
      border: ${border ? border : "none"};
    `}
  font-weight:700;
`;

export { Container, ContainerProps };
