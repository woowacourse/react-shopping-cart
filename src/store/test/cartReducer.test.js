import "@testing-library/jest-dom";

import { MOCK_CART_ITEM_LIST } from "./mock";

import { cartReducer } from "../reducer";
import { ACTIONS } from "../actions";

describe("cartReducer - getCartItem 테스트", () => {
  const initialCartState = {
    loading: true,
    data: [],
    errorMessage: null,
  };

  test("장바구니 아이템 가져오기 action이 들어오면, 장바구니 상태를 초기화한다.", () => {
    const ACTION_GET_CART_ITEM_LIST = {
      type: ACTIONS.GET_CART_ITEM_LIST,
    };

    expect(cartReducer(initialCartState, ACTION_GET_CART_ITEM_LIST)).toEqual({
      ...initialCartState,
    });
  });

  test("장바구니 아이템 가져오기 성공 action이 들어오면, 해당 상품 목록을 장바구니 상태의 data에 업데이트한다.", () => {
    const expectedFetchedCartItemList = [...MOCK_CART_ITEM_LIST];

    const ACTION_GET_CART_ITEM_LIST_SUCCESS = {
      type: ACTIONS.GET_CART_ITEM_LIST_SUCCESS,
      payload: expectedFetchedCartItemList,
    };

    expect(
      cartReducer(initialCartState, ACTION_GET_CART_ITEM_LIST_SUCCESS)
    ).toEqual({
      ...initialCartState,
      loading: false,
      data: expectedFetchedCartItemList,
    });
  });

  test("장바구니 아이템 가져오기 중 에러 발생 action이 들어오면, 에러 메세지를 장바구니 상태의 errorMessage에 업데이트한다.", () => {
    const expectedErrorMessage = "에러메세지";

    const ACTION_GET_CART_ITEM_LIST_ERROR = {
      type: ACTIONS.GET_CART_ITEM_LIST_ERROR,
      payload: expectedErrorMessage,
    };

    expect(
      cartReducer(initialCartState, ACTION_GET_CART_ITEM_LIST_ERROR)
    ).toEqual({
      ...initialCartState,
      loading: false,
      errorMessage: expectedErrorMessage,
    });
  });
});

describe("cartReducer - postCartItem 테스트", () => {
  const initialCartState = {
    loading: true,
    data: [],
    errorMessage: null,
  };

  test("장바구니 아이템 추가 및 수량 변경 action이 들어오면, 장바구니 상태 중 data는 유지하고, loading은 false, errorMessage는 null로 업데이트한다.", () => {
    const ACTION_POST_CART_ITEM = {
      type: ACTIONS.POST_CART_ITEM,
    };

    expect(cartReducer(initialCartState, ACTION_POST_CART_ITEM)).toEqual({
      ...initialCartState,
      loading: false,
      errorMessage: null,
    });
  });

  test("장바구니 아이템 추가 및 수량 변경 성공 action이 들어오면, 새로운 장바구니 아이템 목록을 장바구니 상태의 data에 업데이트한다.", () => {
    const expectedFetchedCartItemList = [...MOCK_CART_ITEM_LIST];

    const ACTION_POST_CART_ITEM_SUCCESS = {
      type: ACTIONS.POST_CART_ITEM_SUCCESS,
      payload: expectedFetchedCartItemList,
    };

    expect(
      cartReducer(initialCartState, ACTION_POST_CART_ITEM_SUCCESS)
    ).toEqual({
      ...initialCartState,
      data: expectedFetchedCartItemList,
    });
  });

  test("장바구니 아이템 추가 및 수량 변경 중 에러 발생 action이 들어오면, 에러 메세지를 장바구니 상태의 errorMessage에 업데이트한다.", () => {
    const expectedErrorMessage = "에러메세지";

    const ACTION_POST_CART_ITEM_ERROR = {
      type: ACTIONS.POST_CART_ITEM_ERROR,
      payload: expectedErrorMessage,
    };

    expect(cartReducer(initialCartState, ACTION_POST_CART_ITEM_ERROR)).toEqual({
      ...initialCartState,
      errorMessage: expectedErrorMessage,
    });
  });
});

describe("cartReducer - deleteCartItem 테스트", () => {
  const initialCartState = {
    loading: true,
    data: [],
    errorMessage: null,
  };

  test("장바구니 아이템 삭제 action이 들어오면, 장바구니 상태 중 data는 유지하고, loading은 false, errorMessage는 null로 업데이트한다.", () => {
    const ACTION_DELETE_CART_ITEM = {
      type: ACTIONS.DELETE_CART_ITEM,
    };

    expect(cartReducer(initialCartState, ACTION_DELETE_CART_ITEM)).toEqual({
      ...initialCartState,
      loading: false,
      errorMessage: null,
    });
  });

  test("장바구니 아이템 삭제 성공 action이 들어오면, 새로운 장바구니 아이템 목록을 장바구니 상태의 data에 업데이트한다.", () => {
    const expectedFetchedCartItemList = [...MOCK_CART_ITEM_LIST];

    const ACTION_DELETE_CART_ITEM = {
      type: ACTIONS.DELETE_CART_ITEM_SUCCESS,
      payload: expectedFetchedCartItemList,
    };

    expect(cartReducer(initialCartState, ACTION_DELETE_CART_ITEM)).toEqual({
      ...initialCartState,
      data: expectedFetchedCartItemList,
    });
  });

  test("장바구니 아이템 삭제 중 에러 발생 action이 들어오면, 에러 메세지를 장바구니 상태의 errorMessage에 업데이트한다.", () => {
    const expectedErrorMessage = "에러메세지";

    const ACTION_DELETE_CART_ITEM_ERROR = {
      type: ACTIONS.DELETE_CART_ITEM_ERROR,
      payload: expectedErrorMessage,
    };

    expect(
      cartReducer(initialCartState, ACTION_DELETE_CART_ITEM_ERROR)
    ).toEqual({
      ...initialCartState,
      errorMessage: expectedErrorMessage,
    });
  });
});
