import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
  }

  a{
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
