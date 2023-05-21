import { createGlobalStyle } from 'styled-components';
import BMHANNAPro from '../assets/fonts/BMHANNAPro.ttf';

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

  @font-face {
      font-family: "BMHANNAPro";
      src: url("${BMHANNAPro}");
  }

  *{
    font-family: "BMHANNAPro";
  }


`;

export default GlobalStyle;
