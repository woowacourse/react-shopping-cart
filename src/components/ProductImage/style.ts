import styled from "styled-components";
import { FlexCenter } from "../../sharedStyled/Flex";

interface ImageProps {
  size: string;
}

const Container = styled(FlexCenter("div"))<ImageProps>`
  ${({ size }) => `width: ${size}; 
    height: ${size};
  `}
  position: relative;
  overflow: hidden;
`;

const Img = styled.img<ImageProps>`
  ${({ size }) => `width: ${size};`}
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.05);
`;

export { Container, Img, ImageProps, Background };
