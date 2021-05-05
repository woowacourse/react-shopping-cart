import styled from "styled-components";

interface IContainerProps {
  size: string;
}

const Container = styled.svg<IContainerProps>`
  width: ${({ size }) => size};

  &:before {
    display: block;
    padding-top: ${(44 * 100) / 51}%;
  }
`;

export { Container, IContainerProps };
