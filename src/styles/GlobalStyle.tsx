import { createGlobalStyle } from 'styled-components';

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
    background-color: white;
  }

  #root {
    width: 100%;
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
`;

export default GlobalStyle;
