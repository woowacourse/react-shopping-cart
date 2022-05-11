import { ThemeProvider } from "styled-components";
import { theme } from "./style";

import { createStore } from "redux";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Main from "./components/Main";
import { composeWithDevTools } from "@redux-devtools/extension";

const productInfoListReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.payload.products;
    default:
      return state;
  }
};

const productInfoListStore = createStore(
  productInfoListReducer,
  composeWithDevTools()
);

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={productInfoListStore}>
          <Header />
          <Main />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
