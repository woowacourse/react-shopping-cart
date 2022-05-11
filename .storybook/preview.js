import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../src/GlobalStyle";
import { theme } from "../src/style";
import { productInfoListStore } from "../src/stores/productInfoListStore";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    return (
      <>
        <BrowserRouter>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Provider store={productInfoListStore}>
              <Story {...context} />
            </Provider>
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  },
];
