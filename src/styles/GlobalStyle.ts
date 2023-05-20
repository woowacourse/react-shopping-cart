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

  margin: auto;

  min-width: 80%;

  padding-top: 90px;

  @media (min-width: 575px) {
    padding-top: 95px;
  }

  @media (min-width: 767px) {
    padding-top: 100px;
  }

  @media (min-width: 991px) {
    padding-top: 110px;
  }

  @media (min-width: 1199px) {
    padding-top: 120px;
  }
`;

export default GlobalStyle;
