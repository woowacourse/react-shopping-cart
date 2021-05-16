import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { COLOR } from "./constants/style";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    color: ${COLOR.GRAY_800};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
