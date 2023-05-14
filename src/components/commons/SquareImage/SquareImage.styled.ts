import styled from 'styled-components';
import { SquareImageProps } from '@components/commons/SquareImage/SquareImage';

const sizePixelMap = {
  s: '25px',
  m: '50px',
  l: '147px',
  xl: '282px',
};

export const StyledSquareImage = styled.img<SquareImageProps>`
  width: ${props => sizePixelMap[props.size]};
  height: ${props => sizePixelMap[props.size]};
`;
