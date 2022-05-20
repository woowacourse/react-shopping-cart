import productList from "../../mocks/dummyData";
import productsReducer, {
  loadProductsFailed,
  loadProductsSuccess,
  ProductState,
} from "../modules/products";

describe("상품 리듀서 테스트", () => {
  const initialState: ProductState = {
    loading: false,
    productList: [],
    error: null,
  };

  test("상품 목록을 불러오기를 성공하면 상품리스트가 저장된다.", () => {
    expect(productsReducer(initialState, loadProductsSuccess(productList))).toEqual({
      loading: false,
      productList,
      error: null,
    });
  });

  test("상품 목록 불러오기를 실패하면 에러 상태가 저장된다.", () => {
    const error = "Network Error" as unknown as Error;
    expect(productsReducer(initialState, loadProductsFailed(error))).toEqual({
      loading: false,
      productList: [],
      error,
    });
  });
});
