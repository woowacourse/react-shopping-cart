import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
	  font: inherit;
	  vertical-align: baseline;
    box-sizing: border-box;
  }

  #root {
	  position: relative;
  }

  button {
  	background-color: #ffffff;
  }
  
  ol, ul {
    list-style: none;
  }
`;

export default GlobalStyle;
