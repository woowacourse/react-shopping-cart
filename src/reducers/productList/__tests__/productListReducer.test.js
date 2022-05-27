import { mockProductList } from 'fixture';
import productListReducer, {
  GET_PRODUCT_LIST_SUCCESS,
} from 'reducers/productList/productList.reducer';

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
      productListReducer(initialProductList, {
        type: GET_PRODUCT_LIST_SUCCESS,
        data: mockProductList,
      }),
    ).toEqual(expectedProductList);
  });
});
