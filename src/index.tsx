import ReactDOM from "react-dom/client";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import App from "./App";
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start({
    serviceWorker: {
      url: "/react-shopping-cart/mockServiceWorker.js",
    },
  });
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
