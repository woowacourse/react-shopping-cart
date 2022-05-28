import { css } from '@emotion/react';
import { COLORS } from 'styles/theme';

import 'styles/utils/Fontawesome.css';
import 'styles/utils/ResetCss.css';

const GlobalStyles = css`
  :root {
    font-size: 16px;
    min-width: 960px;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${COLORS.GRAY_100};
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default GlobalStyles;
