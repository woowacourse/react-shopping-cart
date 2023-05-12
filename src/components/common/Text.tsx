import styled from 'styled-components';

interface TextProps {
  children: string;
  size?: string;
  weight?: string;
  $color?: string;
}

export const Text = ({ children, size, weight, $color }: TextProps) => {
  return (
    <StyledParagraph size={size} weight={weight} $color={$color}>
      {children}
    </StyledParagraph>
  );
};

export const StyledParagraph = styled.p<{
  size?: string;
  weight?: string;
  $color?: string;
}>`
  font-size: ${({ size }) => size || '16px'};
  font-weight: ${({ weight }) => weight || 'normal'};
  color: ${({ $color }) => $color || '#333333'};
`;
