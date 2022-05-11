import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,
  p,
  button {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  @media (max-width: 800px) {
    html {
      font-size: 13px;
    } 
  }
`;

export default GlobalStyle;
