import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css');

  body, button, input {
    font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
  }
`;

export default GlobalStyles;
