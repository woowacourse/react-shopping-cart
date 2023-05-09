import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --primary-color: ##5f0080;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
