import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    list-style-type: none;
  }

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
  }
`;

export default GlobalStyle;
