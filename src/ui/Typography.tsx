import { memo } from 'react';
import * as Styled from './styles/Typography.styles';

interface TextProps {
  children: string;
  size?: string;
  weight?: string;
  color?: string;
}

export const Typography = memo(
  ({
    children,
    size = '16px',
    weight = 'normal',
    color = '#333333',
  }: TextProps) => {
    return (
      <Styled.Paragraph size={size} weight={weight} color={color}>
        {children}
      </Styled.Paragraph>
    );
  }
);
