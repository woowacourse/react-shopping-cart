import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  li, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  :root{
    --header-height: 80px;
  }
`;

export default GlobalStyles;
