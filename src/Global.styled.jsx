import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { COLOR } from "./constants/style";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-size: 1rem;
    color: ${COLOR.GRAY.DARK};
    overflow-y: scroll;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
