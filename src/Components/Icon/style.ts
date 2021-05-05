import styled from "styled-components";

interface ICartContainerProps {
  size: string;
}

const CartContainer = styled.svg<ICartContainerProps>`
  width: ${({ size }) => size};

  $: before {
    display: block;
    padding-top: ${(44 * 100) / 51}%;
  }
`;

export { CartContainer, ICartContainerProps };
