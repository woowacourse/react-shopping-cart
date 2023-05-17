import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.white};
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR';
    color: ${({ theme }) => theme.colors.black};
  }

  a {
    text-decoration: none;
    outline: none;
  }

  ol,ul,li {
    list-style: none;
  }

  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
