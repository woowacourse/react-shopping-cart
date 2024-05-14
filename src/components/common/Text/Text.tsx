import { ReactNode } from 'react';
import styled from 'styled-components';

type TextProps = {
  size?: 's' | 'm' | 'l' | number;
  weight?: 's' | 'm' | 'l' | number;
  children: ReactNode;
};

const StyledText = styled.p<TextProps>`
  font-size: ${({ size }) => {
    switch (size) {
      case 's':
        return '12';
      case 'm':
        return '16';
      case 'l':
        return '24';
      default:
        return size;
    }
  }}px;

  font-weight: ${({ weight }) => {
    switch (weight) {
      case 's':
        return '300';
      case 'm':
        return '500';
      case 'l':
        return '700';
      default:
        return weight;
    }
  }};
`;

const Text = ({ children, size = 'm', weight = 'l' }: TextProps) => {
  return (
    <StyledText size={size} weight={weight}>
      {children}
    </StyledText>
  );
};

export default Text;
