import { css } from '@emotion/react';

const reset = css`
  /* Pretendard 웹폰트 */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css');

  /* Reset 기본 스타일 */
  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  img,
  ul,
  ol,
  li,
  table,
  tr,
  th,
  td,
  form,
  label,
  fieldset,
  legend,
  input,
  textarea,
  button,
  article,
  aside,
  footer,
  header,
  nav,
  section,
  main,
  figure,
  figcaption {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  body {
    line-height: 1;
    font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo',
      'Pretendard Variable', Pretendard, Roboto, 'Noto Sans KR', 'Segoe UI',
      'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      sans-serif;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

export default reset;
