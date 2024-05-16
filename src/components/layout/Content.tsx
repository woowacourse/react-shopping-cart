import React, { ReactNode } from "react";
import { css } from "@emotion/css";

interface ContentProps {
  children: ReactNode | ReactNode[];
}

const Content = ({ children }: ContentProps) => {
  return <section className={contentCSS}>{children}</section>;
};

const contentCSS = css`
  margin: 64px 0;
  padding: 36px 0;
  height: calc(100vh - 138px);
  display: flex;

  flex-direction: column;
  gap: 36px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Content;
