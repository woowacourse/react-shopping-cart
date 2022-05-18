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
		background-color: #fff;
	}

	.App {
		width: 100%;
		height: 100%;
	}
`;

export default GlobalStyle;
