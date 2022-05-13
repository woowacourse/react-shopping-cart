import { ThemeProvider as ProductThemeProvider } from "@emotion/react";

const theme = {
  color: {
    primary: "#2ac1bc",
    white: "white",
    black: "black",
    item: {
      hover: { backgroundColor: "#f2efef", textColor: "#666" },
    },
    itemDetails: {
      shoppingCartButtonColor: "#73675c",
      priceColor: "#333",
    },
  },
};

const ThemeProvider = ({ children }) => {
  return <ProductThemeProvider theme={theme}>{children}</ProductThemeProvider>;
};

export default ThemeProvider;
