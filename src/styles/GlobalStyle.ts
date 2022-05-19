import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Gowun Dodum', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    background: #faf7fc;
  }

  button {
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

export default GlobalStyle;
