import reducers from 'reducers';
import { addCartList, deleteCartItem } from 'actions/cart';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe('2 action에 맞춰서 상태를 의도한대로 잘 변경하는지', () => {
  test('상품 추가 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.', () => {
    // given
    const initialCartItems = {};
    const product = {
      id: 3,
      thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
      name: '왕 감자',
      price: 5000000,
      count: 1,
      isChecked: true,
    };

    // when
    // then
    expect(reducers(initialCartItems, addCartList(product, []))).toEqual({
      products: {
        items: [],
        errorMessage: null,
      },
      product: {
        item: {},
        errorMessage: null,
      },
      cart: {
        items: [
          {
            id: 3,
            thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
            name: '왕 감자',
            price: 5000000,
            count: 1,
            isChecked: true,
          },
        ],
      },
      snackbar: {
        visible: false,
        message: '',
      },
    });
  });

  test('상품 삭제 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에서 제거해야 한다.', () => {
    // given
    const initialCartItems = {
      items: [
        {
          id: 1,
          thumbnail: 'https://storybook.takealook.kr/image/potato.jpg',
          name: '왕 감자',
          price: 5000000,
          count: 1,
          isChecked: true,
        },
      ],
    };
    const productId = 1;

    // when
    // then
    expect(reducers(initialCartItems, deleteCartItem(productId))).toEqual({
      products: {
        items: [],
        errorMessage: null,
      },
      product: {
        item: {},
        errorMessage: null,
      },
      cart: {
        items: [],
      },
      snackbar: {
        visible: false,
        message: '',
      },
    });
  });
});
