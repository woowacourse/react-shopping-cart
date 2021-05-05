import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
  :root {
  /* Color */
  --color-mint: #2AC1BC;
  --color-white: #ffffff;

  /* Font size */
  --font-micro: 0.75rem;
  --font-small: 0.1rem;
  --font-normal: 1.25rem;
  --font-large: 1.5rem;

  /* Font weight */
  --weight-bold: 700;
  --weight-semi-bold: 500;
  --weight-regular: 400;
  --weight-small: 300;
}

/* Universal tags */
* {
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  margin:0;
  padding:0;
}

body {
  cursor: default;
  margin:0;
  padding:0;
}

a {
  text-decoration: none;
}

ul {
  padding-left: 0;
}

li {
  list-style: none;
}

button {
  cursor: pointer;
}
`;

export default GlobalStyle;
