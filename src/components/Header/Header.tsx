import { Container, Button, Wrap } from "./Header.styles";

interface HeaderProps {
  icon: string;
  handleIconClick: () => void;
}

function Header({ icon, handleIconClick }: HeaderProps) {
  return (
    <header css={Wrap}>
      <div css={Container}>
        <button css={Button} onClick={handleIconClick}>
          <img src={icon} alt="헤더 아이콘" />
        </button>
      </div>
    </header>
  );
}

export default Header;
