import { ComponentProps, ReactNode } from 'react';

import { StyledButton } from '@/shared/components/Button/Button.styled';

export type ButtonProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  color?: string;
  fontColor?: string;
  variant?: 'filled' | 'outlined';
  shape?: 'rounded' | 'square';
  isLoading?: boolean;
  children: ReactNode;
} & ComponentProps<'button'>;

export const Button = ({
  size = 'md',
  width = 'auto',
  color = 'black',
  fontColor = 'white',
  variant = 'filled',
  shape = 'rounded',
  isLoading = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      width={width}
      color={color}
      fontColor={fontColor}
      variant={variant}
      shape={shape}
      isLoading={isLoading}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
