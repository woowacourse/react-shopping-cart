import reset from 'styled-reset';
import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  a {
    color: inherit;
    text-decoration: none;
  }

  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }

  #root {
  font-family: 'BMDOHYEON';
  }
`;
