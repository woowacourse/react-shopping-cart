import { HeaderButtonStyle } from './Header.styles';

interface HeaderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function HeaderButton({ children, onClick }: HeaderButtonProps) {
  return (
    <button css={HeaderButtonStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default HeaderButton;
