import cartList, { CART_LIST_ACTION } from "../reducers/cartList";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("cartList 리듀서가 action에 맞춰서 상태를 의도한대로 잘 변경하는지 테스트", () => {
  test("장바구니 목록 가져오기 요청이 들어오면 담은 목록을 장바구니 상태에 추가해야 한다.", () => {
    const initialState = {
      isLoading: false,
      data: [],
      errorMessage: "",
    };
    const product = {
      id: 1,
      thumbnailUrl: "test-url",
      name: "ditto",
      price: 1000,
      count: 1,
    };
    const getCartListAction = {
      type: CART_LIST_ACTION.GET_LIST_SUCCESS,
      carts: [product],
    };

    expect(cartList(initialState, getCartListAction)).toEqual({
      isLoading: false,
      data: [product],
      errorMessage: "",
    });
  });
});
