import styled from "styled-components";

interface IContainerProps {
  width: string;
  height: string;
  color: string;
  fontSize: string;
  backgroundColor: string;
}

const Container = styled.button<IContainerProps>`
  ${({ width, height, color, fontSize, backgroundColor }) => `
      width: ${width}; 
      height: ${height}; 
      color: ${color};
      font-size:${fontSize};
      background-color: ${backgroundColor};
    `}
  font-weight:700;
`;

export { Container, IContainerProps };
