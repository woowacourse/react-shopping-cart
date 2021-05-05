import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ol, ul {
	list-style: none;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

`;

export default GlobalStyle;
