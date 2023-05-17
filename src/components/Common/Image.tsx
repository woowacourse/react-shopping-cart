import styled from 'styled-components';

import { ImgHTMLAttributes } from 'react';

type ImageType = 'small' | 'medium';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: ImageType;
}

const Image = ({ size, ...props }: ImageProps) => {
  return <ImageBox size={size} {...props} />;
};

const ImageBox = styled.img<{ size: ImageType }>`
  width: ${({ size }) => (size === 'medium' ? '282px' : '144px')};
  height: ${({ size }) => (size === 'medium' ? '282px' : '144px')};
`;

export default Image;
