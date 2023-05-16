import styled from 'styled-components';

export const Paragraph = styled.p<{
  size?: string;
  weight?: string;
  color?: string;
}>`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;
