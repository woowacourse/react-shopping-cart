import { css } from "@emotion/css";
import React, { ReactNode } from "react";

interface CartLayoutProps {
  children: ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => {
  return <div className={cartPageCSS}>{children}</div>;
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
