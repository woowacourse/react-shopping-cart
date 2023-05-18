import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  body:has([role='dialog']){
    overflow: hidden;
  }

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
