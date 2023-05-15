import { createGlobalStyle } from 'styled-components';
import './reset.css';

export const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

  * {
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif !important;
  }
  
  html,
  body {
    /* hidden scroll */
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    /* hidden scroll */
    display: none;
  }

  /* Colors *****************************************/
  :root {
  
  }

  #root {
    
  }

  .label-text {
  
  }
`;
