import { createGlobalStyle } from 'styled-components';
import JUA from '@/assets/fonts/Jua-Regular.ttf';
import DoHyeon from '@/assets/fonts/DoHyeon-Regular.ttf';
import HANNAAir from '@/assets/fonts/HANNA-Air-Regular.ttf';
import HANNAEleven from '@/assets/fonts/HANNA-11yrs-Regular.ttf';

export const GlobalFontStyles = createGlobalStyle`
  @font-face {
    font-family: "JUA";
    src: url(${JUA}) format('truetype');
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "DoHyeon";
    src: url(${DoHyeon}) format('truetype');
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "HANNA-Air";
    src: url(${HANNAAir}) format('truetype');
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "HANNA-11yrs";
    src: url(${HANNAEleven}) format('truetype');
    font-weight: 400;
    font-display: swap;
  }
`;
