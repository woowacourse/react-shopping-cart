import styled from "styled-components";

interface ContainerProps {
  size: string;
}

const Container = styled.svg<ContainerProps>`
  width: ${({ size }) => size};

  &:before {
    display: block;
    padding-top: ${(44 * 100) / 51}%;
  }
`;

export { Container, ContainerProps };
