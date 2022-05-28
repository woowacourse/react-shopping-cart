import { css } from '@emotion/react';

import { COLORS } from 'styles/theme';
import 'styles/utils/FontFace.css';
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
    font-family: 'NanumBarunGothic', sans-serif;
    background-color: ${COLORS.GRAY_200};
  }
`;

export default GlobalStyles;
