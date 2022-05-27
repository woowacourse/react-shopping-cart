import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../src/GlobalStyle";
import { theme } from "../src/style";
import { store } from "../src/components/App";

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
            <Provider store={store}>
              <Story {...context} />
            </Provider>
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  },
];
