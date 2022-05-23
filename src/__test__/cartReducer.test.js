import { actionTypes } from '../store/cart/cart.actions';
import cartReducer from '../store/cart/cart.reducer';

describe('장바구니 action 테스트', () => {
  const initialState = {
    cart: [],
  };

  test('장바구니 상품 추가 action이 들어오면, 추가된 상품리스트를 업데이트 한다', () => {
    const product = {
      id: 1,
      name: '아이스컵 92파이 16온스',
      price: '51000',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/9fed83ff-2dc3-448b-9aac-1d4a750b3720.jpg',
      category: 'person',
      amount: 10,
    };

    const addCartItem = {
      type: actionTypes.ADD_CART,
      payload: [product],
    };

    expect(cartReducer(initialState, addCartItem)).toEqual({
      cart: [product],
    });
  });
});
