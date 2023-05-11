import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";

import CartQuantity from "./components/CartQuantity";
import Header from "./components/common/Header";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header>
            <CartQuantity />
          </Header>
          <Outlet />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
