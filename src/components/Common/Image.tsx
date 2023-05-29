import type { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

type ImageSizeType = 'small' | 'medium';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: ImageSizeType;
}

const Image = ({ size = 'medium', ...props }: ImageProps) => {
  return <StyledImage {...props} size={size} />;
};

const imageStyles = {
  small: {
    width: '144px',
    height: '144px',
  },
  medium: {
    width: '282px',
    height: '282px',
  },
};

const StyledImage = styled.img<{ size: ImageSizeType }>`
  ${({ size }) => imageStyles[size]}
`;

export default Image;
