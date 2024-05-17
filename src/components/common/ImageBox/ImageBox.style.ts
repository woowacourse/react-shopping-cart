import styled from 'styled-components';
import { ImageBoxProps } from './ImageBox';

export const ImageBox = styled.div<ImageBoxProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ radius }) => {
    switch (radius) {
      case 's':
        return '4px';
      case 'm':
        return '8px';
      case 'l':
        return '16px';
      default:
        return `${radius}px`;
    }
  }};
  min-width: ${({ width }) => width}px;
  min-height: ${({ height }) => height}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  border: 1px solid ${({ border }) => border};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
