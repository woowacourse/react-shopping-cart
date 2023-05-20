import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Baemin from './assets/fonts/Baemin.ttf';

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

  body {
    font-family: 'Baemin';
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    position: relative;
    width: 28px;
    height: 28px;
    cursor: pointer;
    outline: none !important;
    border: 1px solid #22a6a2;
    border-radius: 2px;
    background: #fbfbfb;
  }

  input[type="checkbox"]::before {
    content: url('data:image/svg+xml,<svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 7L9.11069 14.1107L21.8318 1.38956" stroke="white" stroke-width="3"/></svg>');
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: scale(0) translate(-50%, -50%);
    line-height: 1;
  }
 
  input[type="checkbox"]:checked {
    background-color: var(--grey-400);
    color: var(--grey-100);
    border: 1px solid #3288ff;
  }
 
  input[type="checkbox"]:checked::before {
    border-radius: 2px;
    transform: scale(1) translate(-50%, -50%)
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin:0;
  }

  a {
    text-decoration: none;
    outline: none;
    color:inherit;
  }

  a:hover, a:active {
    text-decoration: none;
  }

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
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
