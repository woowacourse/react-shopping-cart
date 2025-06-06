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
    --color-green: #00c853;
    --color-pink: #ff4d4f;

    --font-family: "Noto Sans KR";
    --font-size-title: 24px;
    --font-weight-title: 700;

    --font-size-subtitle: 14px;
    --font-weight-subtitle: 700;

    --font-size-placeholder: 14px;
    --font-weight-placeholder: 500;

    --font-size-body: 12px;
    --font-weight-body: 500;

    --header-height: 6.4rem;
    --layout-width: 42.9rem;

    --z-index-modal-background: 1000;
    --z-index-modal-content: 1001;
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
  input[type="checkbox"] {
    accent-color: var(--color-black);
  }
`;
export default GlobalStyle;
