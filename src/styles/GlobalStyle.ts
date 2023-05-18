import { createGlobalStyle, keyframes } from "styled-components";

export const skeletonAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    color: #333333
  }
  body {
    margin: 0;
    padding: 0;
  }
  ul,
  li {
  list-style: none;
}

button{
  all: unset;
}

`;

export default GlobalStyle;
