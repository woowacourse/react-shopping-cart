import { PRODUCT_ACTION_TYPE } from 'store/action/productActions';
import productReducer from './productReducer';

describe('상품 리스트 저장상태 테스트', () => {
  let productsState = {
    productList: [],
    selectedProductId: null,
  };
  const reducer = action => {
    productsState = productReducer(productsState, action);
  };

  beforeEach(() => {
    productsState = {
      productList: [],
      selectedProductId: null,
    };
  });

  test('상품 추가 요청이 들어오면 상품을 추가하여 저장할 수 있다.', () => {
    const product = {
      id: 1,
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 2000,
    };

    reducer({
      type: PRODUCT_ACTION_TYPE.UPDATE_PRODUCT_LIST,
      payload: {
        productList: [product],
      },
    });

    expect(productsState.productList).toEqual([product]);
  });

  test('모든 상품 삭제 요청이 들어오면 상품을 모두 삭제할 수 있다.', () => {
    const product = {
      id: 1,
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 2000,
    };

    reducer({
      type: PRODUCT_ACTION_TYPE.UPDATE_PRODUCT_LIST,
      payload: {
        productList: [product],
      },
    });

    reducer({
      type: PRODUCT_ACTION_TYPE.CLEAR_PRODUCT_LIST,
    });

    expect(productsState.productList.length).toEqual(0);
  });
});
