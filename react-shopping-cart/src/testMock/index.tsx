import theme from "styles/theme";
import { ThemeProvider } from "styled-components";
import React from "react";

function MockTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MockTheme;
