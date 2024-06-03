import { ReactNode } from "react";
import { css } from "@emotion/css";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <header className={headerCSS}>{children}</header>;
};

export default Header;

const headerCSS = css`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 24px;
  box-sizing: border-box;
  background: var(--grey-500);

  color: var(--grey-100);
  font-size: 20px;
  font-weight: 800;
`;
