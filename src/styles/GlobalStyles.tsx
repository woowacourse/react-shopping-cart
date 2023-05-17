import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
  }
`;

export default GlobalStyles;
