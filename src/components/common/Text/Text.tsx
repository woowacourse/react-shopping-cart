import type { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

type TextProps = PropsWithChildren<{
  size?: 'smallest' | 'small' | 'medium' | 'large' | 'extraLarge' | 'largest';
  weight?: 'light' | 'normal' | 'bold' | 'extraBold';
  color?: string;
  lineHeight?: string;
}>;

type StyledTextProps = {
  $size: NonNullable<TextProps['size']>;
  $weight: NonNullable<TextProps['weight']>;
  $color: TextProps['color'];
  $lineHeight: TextProps['lineHeight'];
};

const fontSizes: Record<StyledTextProps['$size'], string> = {
  smallest: '16px',
  small: '20px',
  medium: '22px',
  large: '24px',
  extraLarge: '32px',
  largest: '40px',
};

const fontWeights: Record<StyledTextProps['$weight'], number> = {
  light: 400,
  normal: 500,
  bold: 700,
  extraBold: 900,
};

export const StyledText = styled.div<StyledTextProps>`
  font-size: ${(props) => fontSizes[props.$size]};
  font-weight: ${(props) => fontWeights[props.$weight]};
  color: ${(props) => props.$color ?? '#181a1c'};
  line-height: ${(props) => props.$lineHeight};
`;

export const Text = (props: TextProps) => {
  const { size = 'medium', weight = 'normal', color, lineHeight, children } = props;

  return (
    <StyledText $size={size} $weight={weight} $color={color} $lineHeight={lineHeight}>
      {children}
    </StyledText>
  );
};
