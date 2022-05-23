import { store as appStore } from 'store/store';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import Theme from 'styles/Theme';
import { ThemeProvider } from 'styled-components';

function render(ui, { store = appStore, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={Theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
