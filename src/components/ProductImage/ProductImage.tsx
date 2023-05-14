import { css, styled } from 'styled-components';

type ImageSize = 'large' | 'medium' | 'small';

interface ProductImageProps {
  src: string;
  alt?: string;
  size?: ImageSize;
}

const ProductImage = ({
  src,
  alt = '',
  size = 'medium',
}: ProductImageProps) => {
  return (
    <ImageWrapper>
      <Image src={src} loading="lazy" alt={alt} size={size} />
      <ImageBackground />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

const imageSizeMapper = {
  large: '282px',
  medium: '145px',
  small: '70px',
};

const Image = styled.img<{ size: ImageSize }>`
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

export default ProductImage;
