import { styled } from 'styled-components';

interface TextProps {
  children: string;
  size?: string;
  weight?: string;
  $color?: string;
}

export const Text = ({ children, size, weight, $color }: TextProps) => {
  return (
    <StyledText size={size} weight={weight} $color={$color}>
      {children}
    </StyledText>
  );
};

export const StyledText = styled.p<{
  size?: string;
  weight?: string;
  $color?: string;
}>`
  font-size: ${({ size }) => size || '16px'};
  font-weight: ${({ weight }) => weight || 'normal'};
  color: ${({ $color }) => $color || '#333333'};
`;
