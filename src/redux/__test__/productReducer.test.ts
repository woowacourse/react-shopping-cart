import CONDITION from 'constants/condition';
import { ProductStoreState } from 'types/index';
import db from 'db.json';
import { productActions } from 'redux/actions';
import productReducer from '../reducers/product';

const initialState: ProductStoreState = {
  condition: CONDITION.NONE,
  productList: [],
  productDetail: null,
};

describe('상품 reducer 테스트', () => {
  test('모든 상품 정보를 가져오는데 성공하면 productList에 정보를 저장해야 한다.', () => {
    const expectedProductList = db.products;

    expect(
      productReducer(
        initialState,
        productActions.getProductListSuccess(db.products)
      )
    ).toEqual({
      ...initialState,
      condition: CONDITION.COMPLETE,
      productList: expectedProductList,
    });
  });

  test('모든 상품 정보를 가져오는데 실패하면 productList를 비워야 한다.', () => {
    expect(
      productReducer(initialState, productActions.getProductListError())
    ).toEqual({
      ...initialState,
      condition: CONDITION.ERROR,
      productList: [],
    });
  });

  test('특정 상품 정보를 가져오는데 성공하면 productDetail에 정보를 저장해야 한다.', () => {
    const expectedProductDetail = db.products[0];

    expect(
      productReducer(
        initialState,
        productActions.getProductDetailSuccess(db.products[0])
      )
    ).toEqual({
      ...initialState,
      condition: CONDITION.COMPLETE,
      productDetail: expectedProductDetail,
    });
  });

  test('특정 상품 정보를 가져오는데 실패하면 productDetail을 비워야 한다.', () => {
    expect(
      productReducer(initialState, productActions.getProductDetailError())
    ).toEqual({
      ...initialState,
      condition: CONDITION.ERROR,
      productDetail: null,
    });
  });
});
