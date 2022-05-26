import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import App from "@/App";

import "@/styles/style.scss";
import Loading from "@/components/loading/Loading";
import configureStore from "@/redux/index";

const { store, persistor } = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
