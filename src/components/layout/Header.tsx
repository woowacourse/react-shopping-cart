import React, { ReactNode } from "react";
import { css } from "@emotion/css";

interface HeaderProps {
  children: ReactNode;
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
  box-sizing: border-box;
  width: 429px;
  height: 64px;
  padding: 0 24px;
  background: #000000;

  color: #ffffff;
  font-family: Noto Sans;
  font-size: 20px;
  font-weight: 800;
`;
