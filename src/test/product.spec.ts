import cartReducer, {
  actionCreators as productsActions,
  ProductState,
} from "redux/modules/products";

describe("productsReducer 테스트", () => {
  const initialState: ProductState = {
    loading: false,
    productList: [],
    error: null,
  };

  it("should handle loadProducts ", () => {
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      productsActions.loadProducts()
    );
    expect(actual.loading).toEqual(true);
  });

  it("should handle loadProductsSuccess ", () => {
    const newProduct = {
      name: "newProduct",
      price: 10000,
      img: "imgURL",
      id: 1,
    };
    const newProductList = [newProduct];
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      productsActions.loadProductsSuccess(newProductList)
    );
    expect(actual.productList).toEqual(newProductList);
    expect(actual.loading).toEqual(false);
  });

  it("should handle loadProductsFailed ", () => {
    const error = new Error();
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      productsActions.loadProductsFailed(error)
    );
    expect(actual.error).toEqual(error);
    expect(actual.loading).toEqual(false);
  });
});
