import styled from '@emotion/styled';

interface SvgProps {
  scale: string;
}

const SVG = styled.svg`
  ${({ scale }: SvgProps) => `transform: scale(${scale})`};
`;

export { SVG };
