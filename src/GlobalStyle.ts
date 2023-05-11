import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Baemin from './fonts/Baemin.ttf';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Baemin';
    src: url(${Baemin});
  }

  :root {
    --primary-color: #5f0080;
    --grey-100: #ffffff;
    --grey-200: #dddddd;
    --grey-300: #aaaaaa;
    --grey-400: #333333;
    --grey-500: #000000;
  }

  *, *::before, *::after {
    box-sizing: border-box;

  }

  body{
    font-family: 'Baemin';
  }

  a {
    text-decoration: none;
    outline: none;
    color:inherit;
  }

  a:hover, a:active {
    text-decoration: none;
  }

  @keyframes drawStepper {
    from {
      width: 30px;
      opacity: 0;
    }
    to {
      width: 80px;
      opacity: 1;
    }
  }
`;

export default GlobalStyle;
