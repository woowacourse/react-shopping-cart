import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    outline: none;
    color: #fff;
  }

  a:hover, a:active, a:visited {
    text-decoration: none;
    color: #fff;
  }
`;

export default GlobalStyle;
