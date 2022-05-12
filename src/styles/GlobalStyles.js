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
    background-color: ${COLORS.WILDSAND};
  }
`;

export default GlobalStyles;
