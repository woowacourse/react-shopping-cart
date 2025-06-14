import { HeaderButtonStyle } from './Header.styles';

interface HeaderButtonProps {
  src: string;
  onClick?: () => void;
}

function HeaderButton({ src, onClick }: HeaderButtonProps) {
  return (
    <button css={HeaderButtonStyle} onClick={onClick}>
      <img src={src} alt="header-button" />
    </button>
  );
}

export default HeaderButton;
