import { ThemeProvider as ProductThemeProvider } from "@emotion/react";

const theme = {
  color: {
    primary: "#2ac1bc",
  },
};

const ThemeProvider = ({ children }) => {
  return <ProductThemeProvider theme={theme}>{children}</ProductThemeProvider>;
};

export default ThemeProvider;
