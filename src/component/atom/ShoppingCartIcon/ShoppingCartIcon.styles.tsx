import styled from '@emotion/styled';

interface SvgProps {
  scale: string;
}

const SVG = styled.svg`
  cursor: pointer;
  transform: ${({ scale }: SvgProps) => scale && `scale(${scale})`};
`;

export { SVG };
