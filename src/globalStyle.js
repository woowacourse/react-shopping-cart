import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ol, ul {
	list-style: none;
  }

  * {
    box-sizing: border-box;
  }

`;

export default GlobalStyle;
