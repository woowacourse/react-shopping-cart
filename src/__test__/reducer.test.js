import CartItem from '../components/cart/CartItem/CartItem';
import { render } from '@testing-library/react';
import cartReducer from '@/store/cart/reducer';
import { CartActionType } from '@/store/cart/action';

const mockNavigate = jest.fn();
const mockSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

const windowSpy = jest.spyOn(window, 'window', 'get');
windowSpy.mockImplementation(() => ({ visualViewport: { width: 1000 } }));

describe('장바구니 아이템의 삭제 버튼을 클릭하면 의도한 action이 dispatch 되는가?', () => {
  test('삭제 버튼을 클릭하면 상품 삭제 요청을 보내야 한다', () => {
    const product = {
      id: 1,
      name: '캠핑 의자',
      price: 35000,
      imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/camping-chair.jpg',
      quantity: 100,
    };
    /** why am i getting an error ->  */
    /** TypeError: Cannot read properties of undefined (reading 'event') */
    render(<CartItem cart={product} />);
  });
});

describe('action에 맞춰 상태를 업데이트 한다.', () => {
  test('장바구니 상품의 수량을 업데이트 할 수 있다', () => {
    const initialCartList = {
      cartList: [
        {
          id: 1,
          name: '캠핑 의자',
          price: 35000,
          imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/camping-chair.jpg',
          quantity: 100,
        },
      ],
      loadingCartProductId: null,
    };

    const newProduct = {
      id: 1,
      name: '캠핑 의자',
      price: 35000,
      imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/camping-chair.jpg',
      quantity: 55,
    };

    const patchCartSucceeded = {
      type: CartActionType.PATCH_CART_SUCCEEDED,
      payload: {
        id: 1,
        newCartProduct: newProduct,
      },
    };

    expect(cartReducer(initialCartList, patchCartSucceeded)).toEqual({
      ...initialCartList,
      cartList: [
        {
          id: 1,
          name: '캠핑 의자',
          price: 35000,
          imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/camping-chair.jpg',
          quantity: 55,
        },
      ],
    });
  });

  test('장바구니 상품을 삭제할 수 있다.', () => {
    const initialCartList = {
      cartList: [
        {
          id: 1,
          name: '캠핑 의자',
          price: 35000,
          imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/camping-chair.jpg',
          quantity: 100,
        },
        {
          id: 2,
          name: '그릴',
          price: 100000,
          imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/grill.jpg',
          quantity: 100,
        },
      ],
      isLoading: false,
      loadingCartProductId: null,
    };

    const deleteCartSucceeded = {
      type: CartActionType.DELETE_CART_SUCCEEDED,
      payload: {
        deletedCartId: 2,
      },
    };

    expect(cartReducer(initialCartList, deleteCartSucceeded)).toEqual({
      ...initialCartList,
      cartList: [
        {
          id: 1,
          name: '캠핑 의자',
          price: 35000,
          imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/camping-chair.jpg',
          quantity: 100,
        },
      ],
    });
  });
});
