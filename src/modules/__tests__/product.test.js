import productReducer, { GET_PRODUCT, GET_PRODUCT_SUCCESS, GET_PRODUCT_ERROR } from '../product';
import { initialState } from '../index.js';

describe('product reducer test',() => {
  test('loading 중일 경우 상태가 잘 변경되는지 확인한다.', () => {
    const actual = productReducer(JSON.parse(JSON.stringify(initialState.product)), { type: GET_PRODUCT });

    expect(actual).toEqual({
      loading: true,
      data: {},
      error: null,
    });
  })

  test('reducer가 success할 경우 상태가 잘 변경되는지 확인한다.', () => {
    const product = {
      loading: false,
      data: {
        "id": 1,
        "title": "수박",
        "price": 40000,
        "imgUrl": "https://i.pinimg.com/564x/f9/b2/7a/f9b27aabcc32aa1bf54c24fc0684754c.jpg",
        "stock": 30,
        "isInShoppingCart": false,
        "quantity": 1
      },
      error: null,
    }
    const actual = productReducer(JSON.parse(JSON.stringify(initialState.product)), { type: GET_PRODUCT_SUCCESS, product: product.data });

    expect(actual).toEqual({
      loading: false,
      data: {
        "id": 1,
        "title": "수박",
        "price": 40000,
        "imgUrl": "https://i.pinimg.com/564x/f9/b2/7a/f9b27aabcc32aa1bf54c24fc0684754c.jpg",
        "stock": 30,
        "isInShoppingCart": false,
        "quantity": 1
      },
      error: null,
    });
  })

  test('reducer가 error가 날 경우 상태가 잘 변경되는지 확인한다.', () => {
    const product = {
      loading: false,
      data: {},
      error: true,
    }
    const actual = productReducer(JSON.parse(JSON.stringify(initialState.product)), { type: GET_PRODUCT_ERROR });

    expect(actual).toEqual({
      loading: false,
      data: {},
      error: true,
    });
  })
})
