import { ThemeProvider as ProductThemeProvider } from "@emotion/react";

const theme = {
  color: {
    primary: "#2ac1bc",
    black: "#000",
    white: "#fff",
    grey_001: "#f2efef",
    grey_002: "#aaa",
    grey_003: "#666",
    grey_004: "#333",
  },
};

const ThemeProvider = ({ children }) => {
  return <ProductThemeProvider theme={theme}>{children}</ProductThemeProvider>;
};

export default ThemeProvider;
