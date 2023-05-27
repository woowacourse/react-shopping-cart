import type { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

type TextProps = PropsWithChildren<{
  size?: 'minimum' | 'smallest' | 'small' | 'medium' | 'large' | 'largest';
  weight?: 'light' | 'normal' | 'littlebold' | 'bold';
  color?: string;
  lineHeight?: string;
  label?: string;
}>;

type StyledTextProps = {
  $size: NonNullable<TextProps['size']>;
  $weight: NonNullable<TextProps['weight']>;
  $color: TextProps['color'];
  $lineHeight: TextProps['lineHeight'];
};

const fontSizes: Record<StyledTextProps['$size'], string> = {
  minimum: '14px',
  smallest: '16px',
  small: '20px',
  medium: '22px',
  large: '24px',
  largest: '40px',
};

const fontWeights: Record<StyledTextProps['$weight'], number> = {
  light: 400,
  normal: 500,
  littlebold: 700,
  bold: 900,
};

export const StyledText = styled.div<StyledTextProps>`
  font-size: ${(props) => fontSizes[props.$size]};
  font-weight: ${(props) => fontWeights[props.$weight]};
  color: ${(props) => props.$color ?? 'inherit'};
  line-height: ${(props) => props.$lineHeight};
`;

export const Text = (props: TextProps) => {
  const { size = 'medium', weight = 'normal', color, lineHeight, children, label } = props;

  return (
    <StyledText $size={size} $weight={weight} $color={color} $lineHeight={lineHeight} aria-label={label}>
      {children}
    </StyledText>
  );
};
