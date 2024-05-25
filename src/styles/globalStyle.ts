import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  * {
    user-select: none;
  }
  body {
    font-family: sans-serif;
  }
  ol,
  ul, li {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    border: none;
    background-color : inherit;
    padding: 0;
    outline: none;
    cursor: pointer;
    color:inherit;
    font-size:inherit;
    font-weight: inherit ;
    &:disabled {
      cursor: not-allowed;
    }
  }
  input[type="text"]{
    padding: 0;
    padding-inline: 0;
    padding-block: 0;
  }
  /* 스크롤바 */
::-webkit-scrollbar {
  width: 8px; 
}
::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  
}
::-webkit-scrollbar-thumb {
  background-color: #555555; 
  border-radius:10px ;
  padding: 0 1px;
}

`;

export default GlobalStyle;
