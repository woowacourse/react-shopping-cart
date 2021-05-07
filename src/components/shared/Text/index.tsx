import styled from 'styled-components';

interface Props {
  size?: string;
  weight?: string;
  color?: string;
  margin?: string;
}

const Text = styled.p<Props>`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  ${({ margin }) => margin && `margin: ${margin}`};
`;

export default Text;
