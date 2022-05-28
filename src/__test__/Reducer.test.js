import reducers from 'reducers';
import { addCartList, deleteCartItem } from 'actions/cart';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

const initialState = {
  products: {
    items: [],
    errorMessage: null,
  },
  product: {
    item: {},
    isLoading: false,
    errorMessage: null,
  },
  cart: {
    items: [],
  },
  snackbar: {
    visible: false,
    message: '',
  },
};

const product = {
  id: 3,
  thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
  name: '왕 감자',
  price: 5000000,
  count: 1,
  isChecked: true,
};

const updateReducer = (reducer, state) => {
  const updatedState = { ...initialState };
  updatedState[reducer] = state;
  return updatedState;
};

describe('2 action에 맞춰서 상태를 의도한대로 잘 변경하는지', () => {
  test('상품 추가 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.', () => {
    // given
    const initialCartItems = {};

    // when
    // then
    expect(reducers(initialCartItems, addCartList(product, []))).toEqual(
      updateReducer('cart', {
        items: [product],
      }),
    );
  });

  test('상품 삭제 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에서 제거해야 한다.', () => {
    // given
    const initialCartItems = updateReducer('cart', { items: [product] });
    const productId = 3;

    // when
    // then
    expect(reducers(initialCartItems, deleteCartItem([productId]))).toEqual(initialState);
  });
});
