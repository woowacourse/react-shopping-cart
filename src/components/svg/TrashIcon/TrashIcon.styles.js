import styled from '@emotion/styled';

const SVG = styled.svg`
  cursor: pointer;
  transform: ${({ scale }) => scale && `scale(${scale})`};
`;

export { SVG };
