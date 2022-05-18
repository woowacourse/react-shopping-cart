import { MemoryRouter } from 'react-router-dom';
import GlobalStyle from '../src/GlobalStyle';
import { Provider } from 'react-redux';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const createMockStore = (initialState) => {
  return {
    dispatch() {},
    subscribe() {},
    getState() {
      return initialState;
    },
  };
};

const mockInitialState = {
  products: {
    loading: false,
    products: [
      {
        id: '11',
        price: '4800',
        src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg',
        title: '콜드 브루 몰트',
      },
      {
        id: '22',
        price: '4200',
        src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg',
        title: '바닐라 크림 콜드 브루',
      },
      {
        id: '33',
        price: '5500',
        src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg',
        title: '시그니처 핫 초콜릿',
      },
      {
        id: '44',
        price: '6500',
        src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2022/03/[9200000002672]_20220311105511600.jpg',
        title: '제주 비자림 콜드 브루',
      },
      {
        id: '55',
        price: '2800',
        src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2022/04/[9200000003988]_20220406113215251.jpg',
        title: '롤린 민트 초코 콜드 브루',
      },
      {
        id: '66',
        price: '4800',
        src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9300000002853]_20210419104333070.jpg',
        title: '기운내라임',
      },
      {
        id: '77',
        price: '1800',
        src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000038]_20210430113202458.jpg',
        title: '콜드 브루',
      },
    ],
    error: null,
  },
  carts: {},
};

const store = createMockStore(mockInitialState);

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <MemoryRouter>
        <GlobalStyle />
        <Story />
      </MemoryRouter>
    </Provider>
  ),
];
