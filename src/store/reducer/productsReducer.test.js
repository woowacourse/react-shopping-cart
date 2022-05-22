import { PRODUCTS_ACTION_TYPE } from 'store/action/productsActions';
import productsReducer from './productsReducer';

describe('상품 리스트 저장상태 테스트', () => {
  let productsState = [];
  const reducer = action => {
    productsState = productsReducer(productsState, action);
  };

  test('상품 추가 요청이 들어오면 상품을 추가하여 저장할 수 있다.', () => {
    const product = {
      id: 1,
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 2000,
    };

    reducer({
      type: PRODUCTS_ACTION_TYPE.UPDATE_PRODUCTS,
      payload: {
        products: [product],
      },
    });

    expect(productsState).toEqual([product]);
  });

  test('모든 상품 삭제 요청이 들어오면 상품을 모두 삭제할 수 있다.', () => {
    reducer({
      type: PRODUCTS_ACTION_TYPE.CLEAR_PRODUCTS,
    });

    expect(productsState.length).toEqual(0);
  });
});
