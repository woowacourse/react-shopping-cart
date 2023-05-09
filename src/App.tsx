import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme} />
    </>
  );
}

export default App;
