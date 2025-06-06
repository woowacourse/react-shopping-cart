import { ButtonStyle } from './Button.styles';

interface ButtonProps {
  color: 'black' | 'white' | 'gray';
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({
  color,
  variant,
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      css={ButtonStyle(color, variant)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
