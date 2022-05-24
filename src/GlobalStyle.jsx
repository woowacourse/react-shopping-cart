import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`${css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    width: 100%;
    margin: auto 0;
  }

  a {
    text-decoration: none;
    color: unset;
  }
`}`;

export default GlobalStyle;
