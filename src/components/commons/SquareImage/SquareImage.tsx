import { ImgHTMLAttributes } from 'react';

import * as Styled from './SquareImage.styled';

export interface SquareImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: 's' | 'm' | 'l' | 'xl';
}

const SquareImage = (props: SquareImageProps) => {
  const { src, alt, size } = props;

  return <Styled.SquareImage size={size} src={src} alt={alt} loading="lazy" />;
};

export default SquareImage;
