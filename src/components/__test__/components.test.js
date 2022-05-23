import { API_URL } from 'api/constants';
import { CartProductCard } from 'components/cart';
import { ProductList } from 'components/product';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { productList } from 'store/actions/__test__/fixture';
import { render } from './renderTestUtils';

const server = setupServer(
  rest.get(`${API_URL}products`, (_, res, ctx) => {
    return res(ctx.json(productList), ctx.set('x-total-count', productList.length));
  }),
);

const mockLocation = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => mockLocation,
  useSearchParams: () => [new URLSearchParams()],
}));

describe('컴포넌트 렌더 테스트', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('카트 상품 카드 렌더 테스트', () => {
    const product = { id: 1, name: 'test', price: 1000, imageURL: '' };
    const quantity = 1;
    render(<CartProductCard product={product} quantity={quantity} />);
  });
  test('상품 리스트 렌더링 테스트', () => {
    render(<ProductList />);
  });
});
