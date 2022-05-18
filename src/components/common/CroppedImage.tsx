import defaultImage from 'assets/defaultImage.jpeg';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

interface CroppedImageProps {
  src: string;
  width: string;
  height: string;
  alt: string;
}

const CroppedImage = ({ src, width, height, alt }: CroppedImageProps) => {
  const handleErrorImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!(e.target instanceof HTMLImageElement)) return;
    e.target.src = defaultImage;
  };

  return (
    <StyledImageWrapper width={width} height={height}>
      <StyledImage src={src} alt={alt} onError={handleErrorImage}></StyledImage>
    </StyledImageWrapper>
  );
};

export default CroppedImage;

const StyledImageWrapper = styled.div<Pick<CroppedImageProps, 'width' | 'height'>>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`;
