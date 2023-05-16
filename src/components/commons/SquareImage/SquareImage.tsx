import { ImgHTMLAttributes } from 'react';

import { StyledSquareImage } from '@commons/SquareImage/SquareImage.styled';

export interface SquareImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: 's' | 'm' | 'l' | 'xl';
}

export const SquareImage = (props: SquareImageProps) => {
  return <StyledSquareImage {...props}></StyledSquareImage>;
};
