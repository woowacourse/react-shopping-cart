import {GlobalStyles} from 'style/globalStyle.js';
import {addDecorator} from '@storybook/react';
import {ThemeProvider} from 'styled-components';
import theme from 'theme/theme';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import productListReducer from 'store/modules/productList';
import cartReducer from 'store/modules/cart';
import selectedItemReducer from 'store/modules/selectedItem';

const rootReducer = combineReducers({
  productListReducer,
  cartReducer,
  selectedItemReducer,
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
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
