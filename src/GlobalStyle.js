import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: #333333;
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
  }
`;

export default GlobalStyle;
