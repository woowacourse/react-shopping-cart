import { styled } from 'styled-components';

type ImageSize = 'large' | 'medium' | 'small';

interface ProductImageProps {
  src: string;
  alt?: string;
  size?: ImageSize;
}

const ProductImage = ({ src, alt, size = 'medium' }: ProductImageProps) => {
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

const Image = styled.img<{ size: ImageSize }>`
  width: ${({ size }) => {
    switch (size) {
      case 'large':
        return '282px';
      case 'medium':
        return '145px';
      case 'small':
        return '70px';
    }
  }};

  height: ${({ size }) => {
    switch (size) {
      case 'large':
        return '282px';
      case 'medium':
        return '145px';
      case 'small':
        return '70px';
    }
  }};
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
