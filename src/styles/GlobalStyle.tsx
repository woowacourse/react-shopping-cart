import { createGlobalStyle } from 'styled-components';

import { skeleton } from './animations';

const GlobalStyle = createGlobalStyle`
   * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  html,
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    color: #0e0e0e;
  }

  body {
    width: 100vw;
    height: 100vh;
  }

  #root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: 100%;
    max-height: max-content;
    display: flex;
    justify-content: space-around;
  }

  main {
    position: relative;
    margin: 0 24px;
    padding-top: 124px;
    padding-bottom: 72px;
    max-width: 1080px;
    height: fit-content;
  }

  .hide-overflow {
    overflow: hidden;
  }

  .skeleton {
    background: linear-gradient(
      -90deg,
      ${({ theme }) => theme.color.gray3},
      ${({ theme }) => theme.color.gray2},
      ${({ theme }) => theme.color.gray3},
      ${({ theme }) => theme.color.gray2}
    );
    background-size: 400%;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    animation: ${skeleton} 5s infinite ease-out;
  }
`;

export default GlobalStyle;
