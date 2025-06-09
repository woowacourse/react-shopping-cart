import { Container, Button } from "./Header.styles";

interface HeaderProps {
  icon?: string;
  handleIconClick?: () => void;
}

function Header({ icon, handleIconClick }: HeaderProps) {
  return (
    <header css={Container}>
      {icon && handleIconClick && (
        <button css={Button} onClick={handleIconClick}>
          <img src={icon} alt="헤더 아이콘" />
        </button>
      )}
    </header>
  );
}

export default Header;
