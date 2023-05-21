import '@fontsource/noto-sans-kr';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR';
  }
`;

console.log('BASE_URL', import.meta.env.BASE_URL);

export default GlobalStyle;
