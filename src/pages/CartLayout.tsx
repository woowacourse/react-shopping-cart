import { css } from "@emotion/css";
import React, { ReactNode } from "react";

const CartLayout = ({
  headerContent,
  children,
  Footer,
}: {
  headerContent: ReactNode;
  children: ReactNode;
  Footer?: ReactNode;
}) => {
  return (
    <div className={cartPageCSS}>
      <header className={headerCSS}>{headerContent}</header>
      <section className={contentCSS}>{children}</section>
      {Footer}
    </div>
  );
};

export default CartLayout;

const cartPageCSS = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
  height: 100vh;
  width: 429px;
  position: relative;
  padding: 0 24px;
  margin: 0 auto;
  box-sizing: border-box;
`;

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
