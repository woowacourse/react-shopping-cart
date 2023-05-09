import styled from 'styled-components';
import { SquareImageProps } from './SquareImage';

const sizePixelMap = {
  s: '25px',
  m: '50px',
  l: '147px',
  xl: '282px',
};

export const SquareImage = styled.img<SquareImageProps>`
  width: ${props => sizePixelMap[props.size]};
  height: ${props => sizePixelMap[props.size]};
`;
