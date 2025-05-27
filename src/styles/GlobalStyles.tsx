import { css } from "@emotion/react";
import Reset from "./reset";
const GlobalStyle = css`
  ${Reset}
  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  :root {
    --min-width: 375px;
    --max-width: 430px;

    --color-black: #222222;
    --color-dark-grey: #555555;
    --color-white: #ffffff;
    --color-light-grey: #e1e1e1;
    --color-grey: #d7d7d7;
    --color-red: #f54d4d;
    --color-light-red: #ffc9c9;

    --font-family: "Noto Sans KR";
    --font-size-title: 24px;
    --font-weight-title: 700;

    --font-size-subtitle: 14px;
    --font-weight-subtitle: 700;

    --font-size-placeholder: 14px;
    --font-weight-placeholder: 500;

    --font-size-body: 12px;
    --font-weight-body: 500;
  }
  html,
  body {
    font-size: 62.5%;
    scrollbar-width: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-behavior: smooth;
  }
  a {
    text-decoration: none;
  }
  select {
    background: #fff;
  }
  #root {
    width: 100%;
    min-width: var(--min-width);
    max-width: var(--max-width);
    min-height: 100dvh;
    background-color: #fff;
    margin: 0 auto;
  }
  @media (min-width: 430px) {
    #root {
      max-width: var(--max-width);
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
export default GlobalStyle;
