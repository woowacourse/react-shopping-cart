import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import CartQuantity from "./components/CartQuantity";
import Header from "./components/common/Header";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import Router from "./Router";

export default function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}
