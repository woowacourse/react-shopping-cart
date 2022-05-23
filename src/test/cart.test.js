import { cartsReducer, cartsActionCreators } from 'store/carts';

const product = {
  id: '11',
  src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg',
  title: '콜드 브루 몰트',
  price: '4800',
  quantity: 1,
};

describe('장바구니 리듀서 테스트', () => {
  test('상품을 추가하면 해당 상품을 장바구니 상태에 추가해야 한다.', () => {
    // given
    const cartsInitialState = {
      carts: [],
      cartsError: null,
    };

    // when
    const action = cartsActionCreators.addCart(product);

    // then
    expect(cartsReducer(cartsInitialState, action)).toEqual({
      carts: [product],
      cartsError: null,
    });
  });

  test('상품을 제거하면 해당 상품을 장바구니 상태에서 제거해야 한다.', () => {
    // given
    const cartsInitialState = {
      carts: [product],
      cartsError: null,
    };

    // when
    const action = cartsActionCreators.deleteCart(product.id);

    // then
    expect(cartsReducer(cartsInitialState, action)).toEqual({
      carts: [],
      cartsError: null,
    });
  });

  test('상품의 수량을 조정하면 장바구니 상태에서 업데이트돼야 한다.', () => {
    // given
    const cartsInitialState = {
      carts: [product],
      cartsError: null,
    };

    // when
    const action = cartsActionCreators.updateCartQuantity({
      ...product,
      quantity: 2,
    });

    // then
    expect(cartsReducer(cartsInitialState, action)).toEqual({
      carts: [{ ...product, quantity: 2 }],
      cartsError: null,
    });
  });
});
