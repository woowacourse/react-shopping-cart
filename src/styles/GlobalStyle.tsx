import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`${reset}

* {
  box-sizing: border-box;
  padding: 0;

}

body {
  font-family: 'Noto Sans KR';
}

`;

export default GlobalStyle;
