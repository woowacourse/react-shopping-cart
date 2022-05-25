import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

import App from "App";

import store from "redux/store";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require("./mocks/browser");
  worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/react-shopping-cart/mockServiceWorker.js",
    },
  });
}

const GlobalStyle = createGlobalStyle`
  body{  
     margin: 0; 
     height: 100vh;
   }
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
