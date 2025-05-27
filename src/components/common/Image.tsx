import styled from '@emotion/styled';
import { ImgHTMLAttributes, useState } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imageSource: string;
  altText?: string;
  isSoldOut?: boolean;
  width?: string;
  height?: string;
  position?: 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';
}

function Image({
  imageSource,
  altText = '이미지',
  isSoldOut = false,
  ...props
}: ImageProps) {
  const [imageUrl, setImageUrl] = useState(imageSource);

  return (
    <ImageContainer
      src={imageUrl}
      alt={altText}
      isSoldout={isSoldOut}
      onError={() => {
        setImageUrl('./assets/images/DefaultImage.jpg');
      }}
      {...props}
    />
  );
}

const ImageContainer = styled.img<{
  isSoldout: boolean;
  width?: string;
  height?: string;
  position?: 'absolute' | 'relative' | 'static' | 'fixed' | 'sticky';
}>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  object-fit: cover;
  ${({ isSoldout }) => isSoldout && `filter: grayscale(100%) brightness(0.5);`}
  ${({ position }) => position && `position: ${position};`}
`;

export default Image;
