import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import ReduxThunk from "redux-thunk";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import rootReducer from "../reducers/index";

import Header from "./Header";
import {
  OrderListPage,
  ProductCartPage,
  ProductDetailPage,
  ProductListPage,
} from "./pages";

import { theme } from "../style";
import { ROUTES } from "../constants";
import { Main } from "./styled";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Header />
        <Main>
          <Routes>
            <Route exact path={ROUTES.ROOT} element={<ProductListPage />} />
            <Route
              exact
              path={ROUTES.PRODUCT_LIST}
              element={<ProductListPage />}
            />
            <Route
              exact
              path={ROUTES.PRODUCT_DETAIL}
              element={<ProductDetailPage />}
            />
            <Route
              exact
              path={ROUTES.PRODUCT_CART}
              element={<ProductCartPage />}
            />
            <Route
              exact
              path={ROUTES.PRODUCT_ORDER_LIST}
              element={<OrderListPage />}
            />
            <Route path="*" element={<div>잘못된 접근입니다.</div>} />
          </Routes>
        </Main>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
