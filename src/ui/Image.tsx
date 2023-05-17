import { ImgHTMLAttributes } from 'react';
import * as Styled from './styles/Image.styles';
import { EmptyProductImage } from '../types/image';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
}

export const Image = ({
  width = '144px',
  height = '144px',
  src = '',
  alt = '상품 이미지',
}: ImageProps) => {
  return (
    <Styled.Wrapper width={width} height={height}>
      {src ? (
        <img src={`${process.env.PUBLIC_URL}${src}`} alt={alt}></img>
      ) : (
        <EmptyProductImage width={width} height={height} />
      )}
    </Styled.Wrapper>
  );
};
