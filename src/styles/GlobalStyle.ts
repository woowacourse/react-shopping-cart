import { createGlobalStyle, keyframes } from "styled-components";

export const skeletonAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const spin = keyframes` 
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
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
