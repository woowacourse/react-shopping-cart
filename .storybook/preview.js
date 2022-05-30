import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import GlobalStyles from "../src/globalStyles";
import createThunkMiddleware from "../src/lib/thunk";
import reducer from "../src/modules/products";
import ThemeProvider from "../src/ThemeProvider";

const store = createStore(reducer, applyMiddleware(createThunkMiddleware()));

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
  (Story) => (
    <MemoryRouter initialEntries={["/product/1"]}>
      <Provider store={store}>
        <ThemeProvider>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </Provider>
    </MemoryRouter>
  ),
];
