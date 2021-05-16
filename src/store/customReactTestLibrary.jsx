import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import PropTypes from "prop-types";
import cartReducer from "./modules/cartSlice";
import orderReducer from "./modules/orderSlice";

const render = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: {
        cart: cartReducer,
        order: orderReducer,
      },
      preloadedState: initialState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { render };
