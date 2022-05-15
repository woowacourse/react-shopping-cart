import {GlobalStyles} from '../src/style';
import {addDecorator} from '@storybook/react';
import {ThemeProvider} from 'styled-components';
import theme from 'theme/theme';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import productListReducer from 'store/modules/productList';
import productItemReducer from 'store/modules/productItem';
import cartReducer from 'store/modules/cart';

const rootReducer = combineReducers({
  productListReducer,
  productItemReducer,
  cartReducer,
});

const store = createStore(rootReducer);

addDecorator((story) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {story()}
    </ThemeProvider>
  </Provider>
));

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
