import styled from 'styled-components';

interface TextProps {
  children: string;
  size?: string;
  weight?: string;
  color?: string;
}

export const Typography = (
  { children, size, weight, color }: TextProps = {
    children: '',
    size: '16px',
    weight: 'normal',
    color: '#333333',
  }
) => {
  return (
    <StyledParagraph size={size} weight={weight} color={color}>
      {children}
    </StyledParagraph>
  );
};

export const StyledParagraph = styled.p<{
  size?: string;
  weight?: string;
  color?: string;
}>`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;
