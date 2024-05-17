import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`${reset}

html {
    font-size: 62.5%;
   
}

body {
  font-size: 1.6rem;
  max-width: 480px;
  max-height: 100vh;
  margin: auto;

}

button{
    padding: 0;
}

#root {
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 15px
  
}

/* :root {
  
  --black-color: #000000;
  --white-color: #ffffff;

  --font-size-xs: 0.8rem;
  --font-size-sm: 1.2rem;
  --font-size-md: 1.6rem;
  --font-size-lg: 2rem;
  --font-size-xl: 2.4rem;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;
} */

`;

export default GlobalStyle;
