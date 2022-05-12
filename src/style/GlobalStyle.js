import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,
  p,
  button {
    margin: 0;
    padding: 0;
    font-family: BMJUA_ttf;
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
`;

export default GlobalStyle;
