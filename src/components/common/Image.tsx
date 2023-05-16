import { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  source: string;
  alternative: string;
  $width?: string;
  $height?: string;
}

export const Image = ({ $width, $height, source, alternative }: ImageProps) => {
  return (
    <StyledDiv $width={$width} $height={$height}>
      <img src={`${process.env.PUBLIC_URL}${source}`} alt={alternative}></img>
    </StyledDiv>
  );
};

const StyledDiv = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '144px'};
  height: ${({ $height }) => $height || '144px'};

  img {
    width: ${({ $width }) => $width || '144px'};
    height: ${({ $height }) => $height || '144px'};
  }
`;
