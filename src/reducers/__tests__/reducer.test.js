import { productList } from 'assets/mock';
import { getProductListSuccess } from 'reducers/productList/productList.actions';
import productListReducer from 'reducers/productList/productList.reducer';

describe('action에 맞춰서 상태를 의도한대로 잘 변경하는지 확인한다', () => {
  test('상품 목록 요청이 들어오면 해당 상품 목록을 정상적으로 상품 목록 상태에 추가해야 한다.', () => {
    // given
    const initialProductList = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const expectedProductList = {
      data: productList,
      isLoading: false,
      isError: false,
    };

    // when
    // then
    expect(
      productListReducer(
        initialProductList,
        getProductListSuccess(productList),
      ),
    ).toEqual(expectedProductList);
  });
});
