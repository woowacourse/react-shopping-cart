import styled from 'styled-components';

const sizePixelMap = {
  s: '25px',
  m: '50px',
  l: '147px',
  xl: '282px',
};

export const SquareImage = styled.img<{ size: 's' | 'm' | 'l' | 'xl' }>`
  width: ${(props) => sizePixelMap[props.size]};
  height: ${(props) => sizePixelMap[props.size]};
`;
