import React from "react";
import { css } from "@emotion/css";

const Footer = ({ text, isActive, onClick }: { text: string; isActive: boolean; onClick: () => {} }) => {
  return (
    <footer className={footerCSS(isActive)} onClick={isActive ? onClick : undefined}>
      {text}
    </footer>
  );
};

export default Footer;

const footerCSS = (isActive: boolean) => css`
  background-color: ${isActive ? "black" : "grey"};
  color: white;
  padding: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: ${isActive ? "pointer" : "not-allowed"};
  opacity: ${isActive ? 1 : 0.5};
`;
