import { css } from 'styled-components';

const reset = css`
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

  ol,
  ul,
  li {
    list-style: none;
  }

  input {
    background-color: transparent;
    border: 0;
  }

  button {
    color: initial;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
`;

export default reset;
