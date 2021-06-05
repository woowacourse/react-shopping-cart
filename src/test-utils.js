import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import { userReducer } from './store/userReducer';
import { cartReducer } from './store/cartReducer';

const rootReducer = combineReducers({ cartReducer, userReducer });

function render(
  ui,
  { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
