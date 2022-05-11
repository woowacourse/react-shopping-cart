import styled from 'styled-components';

interface CroppedImageProps {
  src: string;
  width: string;
  height: string;
  alt: string;
}

const CroppedImage = ({ src, width, height, alt }: CroppedImageProps) => {
  return (
    <StyledImageWrapper width={width} height={height}>
      <StyledImage src={src} alt={alt}></StyledImage>
    </StyledImageWrapper>
  );
};

export default CroppedImage;

const StyledImageWrapper = styled.div<{ width: string; height: string }>`
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
