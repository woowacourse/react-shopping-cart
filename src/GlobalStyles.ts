import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: sans-serif;
  }

  button {
    outline: none;
    border:none;
    background:none;
    cursor: pointer;

  }

  a {
    text-decoration: none;
  }

  p {
    margin: 0
  }
`;

export default GlobalStyles;
