import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.font};
  }

  *, *:before, *:after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  .flex-row {
    display: flex;
    align-items: center;
  }

  .flex-row-space-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default GlobalStyle;
