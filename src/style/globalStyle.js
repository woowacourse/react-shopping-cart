import { createGlobalStyle } from 'styled-components';
import DoHyeon from 'assets/fonts/DoHyeon-Regular.ttf';
import YeonSung from 'assets/fonts/YeonSung-Regular.ttf';

const GlobalStyle = createGlobalStyle`

* {
  box-sizing:border-box;
  margin: 0;
  padding: 0;
  position: relative;
}

@font-face {
  font-family: 'Do Hyeon';
  src: local("Do Hyeon"),
  url(${DoHyeon}) format('woff');
}

@font-face {
  font-family: 'Yeon Sung';
  src: local("Yeon Sung"),
  url(${YeonSung}) format('woff');
}

`;

export default GlobalStyle;
