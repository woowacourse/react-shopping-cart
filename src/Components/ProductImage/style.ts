import styled from "styled-components";

interface IImageContainerProps {
  size: string;
}

const ImageContainer = styled.div<IImageContainerProps>`
  width: ${({ size }) => size};
  overflow: hidden;
`;

export { ImageContainer };
