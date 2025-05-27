import { css } from "@emotion/css";

interface HeaderProps {
  leading?: string;
  onLeadingClick?: () => void;
}

const Header = ({ leading = "./logo.png", onLeadingClick }: HeaderProps) => {
  return (
    <div className={HeaderContainer}>
      <img className={Leading} src={leading} onClick={onLeadingClick} />
    </div>
  );
};

export default Header;

const HeaderContainer = css`
  width: 100%;
  height: 64px;
  background-color: #000000;
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const Leading = css`
  cursor: pointer;
`;
