import { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  $width?: string;
  $height?: string;
}

export const Image = ({ $width, $height, src, alt }: ImageProps) => {
  return (
    <StyledImage $width={$width} $height={$height}>
      <img src={`${process.env.PUBLIC_URL}${src}`} alt={alt}></img>
    </StyledImage>
  );
};

const StyledImage = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '144px'};
  height: ${({ $height }) => $height || '144px'};

  img {
    width: ${({ $width }) => $width || '144px'};
    height: ${({ $height }) => $height || '144px'};
  }
`;
