import { createGlobalStyle } from 'styled-components';
import '../src/css/reset.css';

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

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: 24px;
    margin: 0;
    padding: 2px 5px;
    opacity: 0;
    cursor: pointer;
  }

  :root {
    --gray-color-200: #c7c7c7;
    --text-color: #333;
  }
`;
