import { render as ReactRender, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { ProductListPage } from 'page';
import { theme } from 'components';
import store from 'store/store';
import { dummyProductList } from 'dummy_data';
import { BASE_URL } from 'constants';

const render = ui => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename={BASE_URL}>{children}</BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }

  ReactRender(ui, { wrapper: Wrapper });
};

describe('json-server 테스트', () => {
  const server = setupServer(
    rest.get('/products', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(dummyProductList));
    }),
  );

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('상품 목록을 가져와 화면에 그린다.', async () => {
    render(<ProductListPage />);

    const items = await screen.findAllByRole('img');
    expect(items).toHaveLength(dummyProductList.length);
  });
});
