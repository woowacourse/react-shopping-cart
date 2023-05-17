import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    background-color: #000000;
  }
  
  body {
    font-family: "Noto Sans KR", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
  }
  
  input,
  button {
    border: none;
    background-color: none;
  }
  
  input:focus {
    outline: none;
  }
  
  ::selection {
    background: #565656;
    color: #1d1d1d;
  }
  
  a {
    text-decoration: none;
  }
  
  a,
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
