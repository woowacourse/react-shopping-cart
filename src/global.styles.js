import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
  :root {
  /* Color */
  --color-mint: #2AC1BC;
  --color-brown: #73675C;
  --color-white: #ffffff;
  --color-light-grey: #F6F6F6;
  --color-grey-50: #DDDDDD;
  --color-grey-100: #d6d6d6;
  --color-grey-150: #cccccc;
  --color-grey-200: #a7a7a7;
  --color-grey-250: #888888;
  --color-grey-300: #737373;
  --color-grey-400: #3e3e3e;
  --color-grey-500: #333333;
  --color-black: #000000;

  /* Font size */
  --font-micro: 0.75rem;
  --font-small: 1rem;
  --font-normal: 1.25rem;
  --font-large: 1.5rem;

  /* Font weight */
  --weight-bold: 700;
  --weight-semi-bold: 500;
  --weight-regular: 400;
  --weight-small: 300;
}

  /* Universal tags */
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    margin:0;
    padding:0;
  }

  html, body {
    // TODO: height: 100vh로 바꾸어 보기 
    height: 100%;
    cursor: default;
    margin:0;
    padding:0;
  }

  #root {
    height: 100%;
  }

  a {
    text-decoration: none;
    outline: none;
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: 0;
  }

`;

export default GlobalStyle;
