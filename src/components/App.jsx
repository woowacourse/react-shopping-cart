import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import ReduxThunk from "redux-thunk";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "../style";
import { ROUTES } from "../constants";

import rootReducer from "../reducers/index";

import Header from "../components/common/Header";
import {
  OrderListPage,
  ProductCartPage,
  ProductDetailPage,
  ProductListPage,
} from "./pages";

import { Main } from "./styled";
import ErrorPage from "./pages/ErrorPage";

export const store = createStore(
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
            <Route path={ROUTES.ROOT} element={<ProductListPage />} />
            <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
            <Route
              path={`${ROUTES.PRODUCT_DETAIL}/:id`}
              element={<ProductDetailPage />}
            />
            <Route path={ROUTES.PRODUCT_CART} element={<ProductCartPage />} />
            <Route
              path={ROUTES.PRODUCT_ORDER_LIST}
              element={<OrderListPage />}
            />
            <Route
              path="*"
              element={<ErrorPage>잘못된 접근입니다.</ErrorPage>}
            />
          </Routes>
        </Main>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
