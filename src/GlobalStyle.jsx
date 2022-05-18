import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    width: 100vw;
    margin: auto 0;
  }

  a {
    text-decoration:none;
  }
`;

export default GlobalStyle;
