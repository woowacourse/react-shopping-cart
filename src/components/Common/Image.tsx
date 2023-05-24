import styled, { css } from 'styled-components';

import { ImgHTMLAttributes } from 'react';

type ImageType = 'small' | 'medium';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: ImageType;
}

const Image = ({ size, ...props }: ImageProps) => {
  return <ImageBox size={size} {...props} />;
};

const ImageStyled = {
  small: css`
    width: 144px;
    height: 144px;

    @media (max-width: 420px) {
      width: 80px;
      height: 80px;
      font-size: 20px;
    }
  `,
  medium: css`
    width: 282px;
    height: 282px;
  `,
};

const ImageBox = styled.img<ImageProps>`
  ${({ size }) => ImageStyled[size]}
`;

export default Image;
