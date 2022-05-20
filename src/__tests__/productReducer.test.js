import productReducer, { initialState } from 'reducers/product/product.reducer';
import * as actions from 'reducers/product/product.actions';
import { productList } from 'assets/mock';

const product = productList[0];

describe('개별 상품 불러오기 요청 액션에 따라 상태가 변경된다.', () => {
  test('(REQUEST) 개별 상품 불러오기 요청이 들어오면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(productReducer(initialState, actions.getProductRequest())).toEqual({
      ...initialState,
      isLoading: true,
      isSucceed: false,
      isError: false,
    });
  });

  test('(SUCCESS) 개별 상품 불러오기 요청이 성공하면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(
      productReducer(initialState, actions.getProductSuccess(product)),
    ).toEqual({
      ...initialState,
      data: product,
      isLoading: false,
      isSucceed: true,
      isError: false,
    });
  });

  test('(ERROR) 개별 상품 불러오기 요청이 실패하면 상태가 정상적으로 수정되어야 한다.', () => {
    expect(productReducer(initialState, actions.getProductError())).toEqual({
      ...initialState,
      isLoading: false,
      isSucceed: false,
      isError: true,
    });
  });
});
