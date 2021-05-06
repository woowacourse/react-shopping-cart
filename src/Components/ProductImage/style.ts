import styled from "styled-components";

interface IImageProps {
  size: string;
}

const Container = styled.div<IImageProps>`
  ${({ size }) => `width: ${size}; 
    height: ${size};
  `}
  overflow: hidden;
`;

const Img = styled.img<IImageProps>`
  ${({ size }) => `width: ${size};`}
`;

export { Container, Img, IImageProps };
