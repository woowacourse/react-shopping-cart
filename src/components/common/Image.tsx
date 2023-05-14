import { ImgHTMLAttributes } from 'react';
import * as Styled from './styles/Image.styles';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  $width?: string;
  $height?: string;
}

export const Image = ({ $width, $height, src, alt }: ImageProps) => {
  return (
    <Styled.Wrapper $width={$width} $height={$height}>
      <img src={`${process.env.PUBLIC_URL}${src}`} alt={alt}></img>
    </Styled.Wrapper>
  );
};
