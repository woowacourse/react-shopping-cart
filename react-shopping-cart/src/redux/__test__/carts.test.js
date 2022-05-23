import {
  addProductToCartStart,
  addProductToCartSuccess,
  deleteProductFromCartStart,
  deleteProductFromCartSuccess,
  fetchCartsStart,
  fetchCartsSuccess,
} from 'redux/carts/carts.action';
import cartsReducer from 'redux/carts/carts.reducer';

describe('carts reducer 테스트', () => {
  const product = {
    id: 'albur1',
    name: '[든든] 기분 오뎅세트 433g',
    price: 8900,
    thumbnail:
      'https://cdn-mart.baemin.com/goods/custom/20200525/11331-main-01.png',
    user: 'albur',
  };

  const productWithQuantity = { ...product, quantity: 1 };

  test('상품을 카트에 담은 후 상품 목록 가져오기', () => {
    const INITIAL_STATE = {
      isLoading: false,
      carts: [],
      error: null,
    };

    expect(cartsReducer(INITIAL_STATE, addProductToCartStart(product))).toEqual(
      {
        isLoading: true,
        carts: [],
        error: null,
      }
    );

    expect(
      cartsReducer(INITIAL_STATE, addProductToCartSuccess(product))
    ).toEqual({
      isLoading: false,
      carts: [],
      error: null,
    });

    expect(cartsReducer(INITIAL_STATE, fetchCartsStart())).toEqual({
      isLoading: true,
      carts: [],
      error: null,
    });

    expect(
      cartsReducer(INITIAL_STATE, fetchCartsSuccess([productWithQuantity]))
    ).toEqual({
      isLoading: false,
      carts: [productWithQuantity],
      error: null,
    });
  });

  test('카트에 있는 상품을 제거한 후 상품 목록 가져오기', () => {
    const INITIAL_STATE = {
      isLoading: false,
      carts: [productWithQuantity],
      error: null,
    };

    expect(
      cartsReducer(
        INITIAL_STATE,
        deleteProductFromCartStart(productWithQuantity.id)
      )
    ).toEqual({
      isLoading: true,
      carts: [productWithQuantity],
      error: null,
    });

    expect(
      cartsReducer(
        INITIAL_STATE,
        deleteProductFromCartSuccess(productWithQuantity.id)
      )
    ).toEqual({
      isLoading: false,
      carts: [productWithQuantity],
      error: null,
    });

    expect(cartsReducer(INITIAL_STATE, fetchCartsStart())).toEqual({
      isLoading: true,
      carts: [productWithQuantity],
      error: null,
    });

    expect(cartsReducer(INITIAL_STATE, fetchCartsSuccess([]))).toEqual({
      isLoading: false,
      carts: [],
      error: null,
    });
  });
});
