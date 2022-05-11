import { css, Global } from "@emotion/react";

const baseUrl = process.env.PUBLIC_URL;
const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "NotoSansKR", sans-serif;
        src: url(${baseUrl} + "/assets/fonts/NotoSansKR-Black.otf"),
          url(${baseUrl} + "/assets/fonts/NotoSansKR-Bold.otf"),
          url(${baseUrl} + "/assets/fonts/NotoSansKR-Light.otf"),
          url(${baseUrl} + "/assets/fonts/NotoSansKR-Medium.otf"),
          url(${baseUrl} + "/assets/fonts/NotoSansKR-Regular.otf"),
          url(${baseUrl} + "/assets/fonts/NotoSansKR-Thin.otf");
      }
      * {
        box-sizing: border-box;
        font-family: NotoSansKR;
        margin: 0;
        padding: 0;
      }

      p {
        cursor: default;
      }

      a {
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        outline: none;
      }

      button {
        cursor: pointer;
      }
      .App {
        padding: 0 10%;
      }
    `}
  />
);

export default GlobalStyles;
