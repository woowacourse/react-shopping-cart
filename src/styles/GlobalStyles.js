import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    font-family: Noto Sans CJK KR, sans-serif;
    letter-spacing: -0.03px; 
    
  }
`;
