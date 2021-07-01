import { createGlobalStyle } from 'styled-components';

import PALETTE from './constants/palette';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    color: ${PALETTE.BLACK};
  }

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 960px) {
    html {
      font-size: 12px;
    }
  }
`;

export default GlobalStyle;
