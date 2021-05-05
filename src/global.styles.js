import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
  :root {
  /* Color */

  /* Font size */

  /* Font weight */
}

/* Universal tags */
* {
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
}

body {
  cursor: default;
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
