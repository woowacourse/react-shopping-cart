import styled, { createGlobalStyle } from 'styled-components';

import resetStyle from './resetStyle';

const GlobalStyle = createGlobalStyle`
    ${resetStyle}

    button {
        border:none;
    }
`;

export const CommonPageStyle = styled.div`
  width: 60%;
  min-width: 1200px;
  margin: auto;
  padding-top: 120px;
`;

export default GlobalStyle;
