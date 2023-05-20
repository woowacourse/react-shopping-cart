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
    background-color: white;
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  main {
    position: relative;
    padding-top: 136px;
    padding-bottom: 72px;
    width: 1080px;
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
