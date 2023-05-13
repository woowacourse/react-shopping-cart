import { ImgHTMLAttributes } from 'react';

import { StyledSquareImage } from './SquareImage.styled';

export interface SquareImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: 's' | 'm' | 'l' | 'xl';
}

const SquareImage = (props: SquareImageProps) => {
  const { src, alt, size } = props;

  return (
    <StyledSquareImage size={size} src={src} alt={alt}></StyledSquareImage>
  );
};

export default SquareImage;
