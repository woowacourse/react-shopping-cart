import { ComponentProps, ReactNode } from 'react';

import { StyledButton } from './Button.styled';

export type ButtonProps = {
  /**
   * The size of the button
   * @type {string}
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The width of the button
   * @type {string | number}
   * @description It can be a string (e.g. '100%') or a number (e.g. 100).  1rem = 16px
   * @default '2rem'
   */
  width?: string | number;
  /**
   * The color of the button
   * @type {string}
   * @description If possible, use hex codes (e.g., `#808080`) instead of named colors like `'gray'`,
   * since named colors can't be adjusted with rgba for transparency (e.g., `rgba(gray, 0.5)` won't work).
   * @default 'black'
   */
  color?: string;
  /**
   * The font color of the button
   * @type {string}
   * @default 'white'
   */
  fontColor?: string;
  /**
   * The variant of the button
   * @type {string}
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined';
  /**
   * The shape of the button
   * @type {string}
   * @default 'rounded'
   */
  shape?: 'rounded' | 'square';
  /**
   * The loading state of the button
   * @type {boolean}
   * @default false
   */
  isLoading?: boolean;
  /**
   * The content of the button
   */
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
