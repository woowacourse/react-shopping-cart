import { css } from '@emotion/react';
import Reset from './reset';

const GlobalStyle = css`
  ${Reset}
  * {
    box-sizing: border-box;
  }

  :root {
    --min-width: 375px;
    --max-width: 430px;
  }

  html,
  body {
    font-size: 62.5%;
    scrollbar-width: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-behavior: smooth;
    background-color: #f5f5f5;
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
    padding: 0;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
