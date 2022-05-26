import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset}
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: 'Noto Sans KR';
  }
`;

export default GlobalStyles;
