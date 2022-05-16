import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import rootReducer from 'reducers';
import { ProductList, NotFound } from 'pages';
import { GlobalStyle, theme } from 'styles';

const store = createStore(rootReducer);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ThemeProvider theme={theme}>
            <div className="App">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
