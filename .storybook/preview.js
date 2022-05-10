import { ThemeProvider } from "styled-components";

import GlobalStyle from "../src/GlobalStyle";
import { theme } from "../src/style";

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
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Story {...context} />
        </ThemeProvider>
      </>
    );
  },
];
