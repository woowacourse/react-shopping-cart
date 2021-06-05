import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
:root {
  /* Color */
  --color-background: #E5E5E5;

  --color-mint: #2AC1BC;
  --color-mint-500: #00847f;
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
    user-select: none;
    font-family: 'Noto Sans KR', sans-serif;
    margin:0;
    padding:0;
    border: 0;
    outline: 0;
  }

  html, body, #root, .App {
    height: 100%;
    cursor: default;
    margin:0;
    padding:0;

    &::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
    
    &:visited {
      color: inherit;
    }
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: 0;
  }

  @keyframes gelatine {
    from, to { transform: scale(1, 1); }
    25% { transform: scale(0.9, 1.1); }
    50% { transform: scale(1.1, 0.9); }
    75% { transform: scale(0.95, 1.05); }
  }
`;

export default GlobalStyle;
