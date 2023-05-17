import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border:none
  }
  
  ul,
  li {
    list-style: none;
  }
  
  html,
  body {
    font-family: 'Noto Sans KR', sans-serif;    
    font-size: 62.5%;
  }

  button {
    cursor: pointer;
  }

  a:-webkit-any-link {
    text-decoration: none;
    color: inherit;

    cursor: pointer;
  }
`;

export default GlobalStyle;
