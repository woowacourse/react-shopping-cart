import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    color: #333333
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  ul,li {
  list-style: none;
  }

  button{
  all: unset;
  cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  *{
    font-family: "Helvetica Neue";
  }


`;

export default GlobalStyle;
