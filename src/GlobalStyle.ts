import { createGlobalStyle } from 'styled-components';

import Baemin from './fonts/Baemin.ttf';

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    font:inherit;
    color:inherit;
  }

  *, :after, :before {
    box-sizing:border-box;
    flex-shrink:0;
  }

  :root {
    --primary-color: #5f0080;
    --toast-box-color: rgba(29, 45, 48, 0.9);
    --grey-100: #ffffff;
    --grey-200: #dddddd;
    --grey-300: #aaaaaa;
    --grey-400: #333333;
    --grey-500: #000000;

    -webkit-tap-highlight-color:transparent;
    -webkit-text-size-adjust:100%;
    text-size-adjust:100%;
    line-height:1.5;
    overflow-wrap:break-word;
    word-break:break-word;
    tab-size:4;
    cursor:default;
  }

  html, body {
    height:100%;
    font-family: 'Baemin', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;

    ::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
  }

  img, picture, video, canvas, svg {
    display: block;max-width:100%;
  }

  button {
    background:none;
    border:0;
    cursor:pointer;
  }

  a {
    text-decoration:none;
  }

  table {
    border-collapse:collapse;
    border-spacing:0
  }

  ul,
  li {
      list-style: none;
  }

  @font-face {
    font-family: 'Baemin';
    src: url(${Baemin});
  }
`;

export default GlobalStyle;
