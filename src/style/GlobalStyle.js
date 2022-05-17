import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.font};
  }

  *, *:before, *:after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .flex-row {
    display: flex;
    align-items: center;
  }
`;

export default GlobalStyle;
