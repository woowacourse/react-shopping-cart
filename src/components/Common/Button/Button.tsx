import { ButtonHTMLAttributes } from 'react';
import { buttonLayout } from './Button.style';
import { SerializedStyles } from '@emotion/react';

type ButtonStyleProps = 'primary' | 'secondary' | 'ghost';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  onClick: () => void;
  children: React.ReactNode;
  style?: ButtonStyleProps;
  size?: 'sm' | 'full';
  dataTestid?: string;
  customCss?: SerializedStyles;
}

export function Button({
  onClick,
  children,
  style = 'primary',
  size = 'sm',
  dataTestid,
  disabled = false,
  customCss,
}: ButtonProps) {
  const colorVariant = {
    primary: { backgroundColor: '#000000', color: '#FFFFFF', border: 'none' },
    secondary: {
      backgroundColor: '#BEBEBE',
      color: '#FFFFFF',
      border: 'none',
    },
    ghost: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      border: '1px solid #0000001A',
    },
  };

  return (
    <button
      css={[
        buttonLayout(
          colorVariant[style].backgroundColor,
          colorVariant[style].color,
          colorVariant[style].border,
          size,
          disabled
        ),
        customCss,
      ]}
      onClick={onClick}
      data-testid={dataTestid}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
