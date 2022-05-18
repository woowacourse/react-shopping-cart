import { css, Global } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        font-family: "Noto Sans KR", sans-serif;
        margin: 0;
        padding: 0;
      }

      img {
        display: block;
      }

      p {
        cursor: default;
      }

      a {
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        outline: none;
      }

      button {
        border: none;
        margin: 0;
        padding: 0;
        overflow: visible;
        background: transparent;
        color: inherit;
        font: inherit;
        cursor: pointer;
      }

      input,
      label {
        cursor: pointer;
      }

      .App {
        padding: 0 10%;
        margin: 140px 0;
      }
    `}
  />
);

export default GlobalStyles;
