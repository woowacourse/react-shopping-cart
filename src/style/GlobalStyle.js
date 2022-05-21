import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,
  p,
  button {
    margin: 0;
    padding: 0;
    font-family: BMJUA_ttf;
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @media (max-width: 800px) {
    html {
      font-size: 13px;
    } 
  }

  #root {
    width: 100vw;
    height: 100vh;
  }

  .link-text {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
