import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: sans-serif;
  }

  h1, h2, h3, h4 ,h5 ,h6 {
    font-weight: normal;
    margin: 0;
  }

  button {
    padding: 0;
    outline: none;
    border:none;
    background:none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  input{
    border:none;
    outline: none;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
    }
  }
  
  ol, ul ,li{
    margin: 0;
    padding: 0;
    list-style:none;
  }
`;

export default GlobalStyles;
