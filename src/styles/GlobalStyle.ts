import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }

  button {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: inherit;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    outline: none;
    color: inherit;
  }
`;

export default GlobalStyle;
