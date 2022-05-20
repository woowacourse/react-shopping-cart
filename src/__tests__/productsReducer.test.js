import productsReducer, {
  initialState,
} from 'reducers/products/products.reducer';
import * as actions from 'reducers/products/products.actions';
import { productList } from 'assets/mock';

describe('전체 상품 불러오기 요청 액션에 따라 상태가 변경된다.', () => {
  test('(REQUEST) 전체 상품 불러오기 요청이 들어오면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(productsReducer(initialState, actions.getProductsRequest())).toEqual(
      {
        ...initialState,
        isLoading: true,
        isSucceed: false,
        isError: false,
      },
    );
  });

  test('(SUCCESS) 전체 상품 불러오기 요청이 성공하면, 상태가 정상적으로 수정되어야 한다.', () => {
    expect(
      productsReducer(initialState, actions.getProductsSuccess(productList)),
    ).toEqual({
      ...initialState,
      data: productList,
      isLoading: false,
      isSucceed: true,
      isError: false,
    });
  });

  test('(ERROR) 전체 상품 불러오기 요청이 실패하면 상태가 정상적으로 수정되어야 한다.', () => {
    expect(productsReducer(initialState, actions.getProductsError())).toEqual({
      ...initialState,
      isLoading: false,
      isSucceed: false,
      isError: true,
    });
  });
});
