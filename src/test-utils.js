// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
// Import your own reducer

import { reducer } from './store';
import { cartReducer } from './store/cartReducer';

const rootReducer = combineReducers({ cartReducer, reducer });

function render(
  ui,
  { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
