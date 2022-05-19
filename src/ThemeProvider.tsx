import { ThemeProvider as ProductThemeProvider } from "@emotion/react";

const theme = {
  color: {
    primary: "#2ac1bc",
    white: "white",
    black: "black",
    gray: "#666",
    darkGray: "#333",
    brown: "#73675c",
    darkWhite: "#f2efef",
  },
};

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  return <ProductThemeProvider theme={theme}>{children}</ProductThemeProvider>;
};

export default ThemeProvider;
