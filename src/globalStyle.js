import { createGlobalStyle } from 'styled-components';
import PALETTE from './constants/palette';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    color: ${PALETTE.BLACK};
  }

  @media only screen and (max-width: 960px) {
    html {
      font-size: 12px;
    }
  }
`;

export default GlobalStyle;
