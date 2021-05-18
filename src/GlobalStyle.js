import { createGlobalStyle } from 'styled-components';
import { COLOR } from './constants/color';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: ${COLOR.GRAY_800};
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
    background-color:${({ backgroundColor }) => backgroundColor}
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

  p {
    margin: 0;
  }

  button {
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    background-color: inherit;
  }
`;

export default GlobalStyle;
