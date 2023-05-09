import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color:#333333;
    --background-color: #F5F5F5;
    --alert-color: #04C09E;

    --gray-100:#DDD;
    --gray-200: #CCC;
    --gray-300: #BBB;
    --gray-400: #AAA;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--background-color);
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR';
    color: var(--primary-color);
  }

  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
