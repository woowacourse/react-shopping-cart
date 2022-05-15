import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
    * {
      box-sizing:border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: ${theme.backgroundColor};
      color: ${theme.textColor}
    }
  `}
`;
