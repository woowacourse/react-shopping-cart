import { buttonStyles } from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'smallBlack' | 'largeBlack' | 'coupon';
}

const Button = ({
  variant = 'smallBlack',
  children,
  ...props
}: ButtonProps) => {
  const buttonStyle = buttonStyles[variant];
  return (
    <button css={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
