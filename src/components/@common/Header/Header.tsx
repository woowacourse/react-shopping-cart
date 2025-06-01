import { css } from "@emotion/css";

interface HeaderProps {
  leadingIcon?: string;
  onLeadingClick?: () => void;
}

const Header = ({
  leadingIcon = "./logo.svg",
  onLeadingClick,
}: HeaderProps) => {
  return (
    <header className={HeaderStyle}>
      <img
        data-testid={"header-leading"}
        className={Leading}
        src={leadingIcon}
        onClick={onLeadingClick}
      />
    </header>
  );
};

export default Header;

const HeaderStyle = css`
  position: sticky;
  top: 0;
  width: 100%;
  height: 64px;
  background-color: #000000;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 2;
`;

const Leading = css`
  cursor: pointer;
`;
