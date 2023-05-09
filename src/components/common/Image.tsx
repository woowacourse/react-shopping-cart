import { styled } from 'styled-components';

interface ImageProps {
  source: string;
  alternative: string;
  $width?: string;
  $height?: string;
}

export const Image = ({ $width, $height, source, alternative }: ImageProps) => {
  return (
    <StyledImage $width={$width} $height={$height}>
      <img src={source} alt={alternative}></img>
    </StyledImage>
  );
};

const StyledImage = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '144px'};
  height: ${({ $height }) => $height || '144px'};

  img {
    width: ${({ $width }) => $width || '144px'};
    height: ${({ $height }) => $height || '144px'};
  }
`;
