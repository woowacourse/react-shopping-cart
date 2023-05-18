import { css, styled } from 'styled-components';

type ImageSize = 'large' | 'medium' | 'small';

interface ImageProps {
  src: string;
  alt?: string;
  size?: ImageSize;
}

const Image = ({ src, alt = '', size = 'medium' }: ImageProps) => {
  return (
    <ImageWrapper size={size}>
      <Img src={src} loading="lazy" alt={alt} size={size} />
      <ImageBackground />
    </ImageWrapper>
  );
};

const imageSizeMapper = {
  large: '282px',
  medium: '145px',
  small: '70px',
};

const ImageWrapper = styled.div<{ size: ImageSize }>`
  ${({ size }) => css`
    width: ${imageSizeMapper[size]};
    height: ${imageSizeMapper[size]};
  `}

  display: flex;
  position: relative;
`;

const Img = styled.img<{ size: ImageSize }>`
  ${({ size }) => css`
    width: ${imageSizeMapper[size]};
    height: ${imageSizeMapper[size]};
  `}

  object-fit: cover;
`;

const ImageBackground = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.05);
`;

export default Image;
