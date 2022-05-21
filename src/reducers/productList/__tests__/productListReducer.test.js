import { mockProductList } from 'fixture';
import productListReducer from 'reducers/productList/productList.reducer';
import * as actions from 'reducers/productList/productList.actions';

describe('action에 맞춰서 상태를 의도한대로 잘 변경하는지 확인한다', () => {
  test('상품 목록 요청이 들어오면 해당 상품 목록을 정상적으로 상품 목록 상태에 추가해야 한다.', () => {
    const initialProductList = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedProductList = {
      data: mockProductList,
      isLoading: false,
      isError: false,
    };

    expect(
      productListReducer(
        initialProductList,
        actions.getProductListSuccess(mockProductList),
      ),
    ).toEqual(expectedProductList);
  });
});
