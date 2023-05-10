import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --primary-color: #5f0080;
    --grey-100: #ffffff;
    --grey-200: #dddddd;
    --grey-300: #aaaaaa;
    --grey-400: #333333;
    --grey-500: #000000;
  }

  *, *::before, *::after {
    box-sizing: border-box;

  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    text-decoration: none;
    outline: none;
    color:inherit;
  }

  a:hover, a:active {
    text-decoration: none;
  }
`;

export default GlobalStyle;
