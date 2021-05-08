import { css, Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

      body {
        margin: 0;
        padding: 0;

        min-height: 100vh;
        width: 100%;
      }

      #root {
        font-family: 'Noto Sans KR', sans-serif;
        height: 100%;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
        outline: none;
        color: black;
        &:hover,
        &:active,
        &:visited,
        &:focus {
          text-decoration: none;
        }
      }

      button {
        outline: none;
        border: none;
        background: none;
      }
    `}
  />
);

export default GlobalStyles;
