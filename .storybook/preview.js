import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import GlobalStyles from 'styles/globalStyles';

import rootReducer from 'modules';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyles />
        <Story />
      </Provider>
    </BrowserRouter>
  ),
];
