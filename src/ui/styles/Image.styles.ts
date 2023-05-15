import styled from 'styled-components';

export const Wrapper = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '144px'};
  height: ${({ $height }) => $height || '144px'};

  img {
    width: ${({ $width }) => $width || '144px'};
    height: ${({ $height }) => $height || '144px'};
  }
`;
