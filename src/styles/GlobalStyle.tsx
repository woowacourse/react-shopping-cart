import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  body, button, input {
    font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
  }
  
  :root {
    --color-black: #000;
    --color-white: #FFF;
    --color-light-gray: #AAA;
    --color-header: #333;
    --color-shopping-cart-quantity: #04c09e;
    --color-image-overlay: #ddd4ba;
  }
`;

export default GlobalStyles;
