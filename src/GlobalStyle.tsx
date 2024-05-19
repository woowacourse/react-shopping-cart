import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`${reset}

html, body {
  font-size: 62.5%;
  height: 100%;
  margin: auto;
}

body {
  display: flex;
  flex-direction: column;
  max-width: 480px;
  font-size: 1.6rem;
}

#root {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 15px;
  height: 100%;
}

:root {
  --black-color: #000000;
  --white-color: #ffffff;

  --font-size-xs: 0.8rem;
  --font-size-sm: 1.2rem;
  --font-size-base: 1.6rem;
  --font-size-lg: 2rem;
  --font-size-xl: 2.4rem;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;
}
`;

export default GlobalStyle;
