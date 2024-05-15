import React from "react";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const Header = ({ title, showBackButton }) => {
  const navigate = useNavigate();

  return (
    <header className={headerCSS}>
      {showBackButton && (
        <button className={backButtonCSS} onClick={() => navigate(-1)}>
          &lt;
        </button>
      )}
      {title}
    </header>
  );
};

export default Header;

const headerCSS = css`
  background-color: black;
  color: white;
  padding: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  position: relative;
`;

const backButtonCSS = css`
  position: absolute;
  left: 16px;
  top: 16px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;
