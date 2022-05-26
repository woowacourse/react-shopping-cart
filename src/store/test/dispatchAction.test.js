import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  ACTIONS,
  deleteCartItem,
  getCartItemList,
  postCartItemByProductList,
} from "../actions";

import { MOCK_CART_ITEM_LIST } from "./mock";

import { API_SERVER } from "../../constants";

const { BASE_URL, PATH } = API_SERVER;
const cartUrl = `${BASE_URL}${PATH.CART}`;

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const server = setupServer(
  rest.get(cartUrl, (req, res, ctx) => {
    return res(ctx.json(MOCK_CART_ITEM_LIST));
  })
);

describe("장바구니 아이템 정보 가져오기 요청 관련 dispatch action 테스트", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("장바구니 아이템 정보 불러오기 요청이 있으면, GET_CART_ITEM_LIST_PENDING 액션이 dispatch 되어야 한다.", async () => {
    await getCartItemList()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.GET_CART_ITEM_LIST_PENDING,
    });
  });

  test("장바구니 아이템 정보를 불러오는 데 성공하면, GET_CART_ITEM_LIST_SUCCESS 액션이 dispatch 되어야 한다.", async () => {
    await getCartItemList()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.GET_CART_ITEM_LIST_SUCCESS,
      payload: MOCK_CART_ITEM_LIST,
    });
  });

  test("장바구니 아이템 정보를 불러오는 데 실패하면, GET_CART_ITEM_LIST_ERROR 액션이 dispatch 되어야 한다.", async () => {
    server.use(
      rest.get(cartUrl, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    await getCartItemList()(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.GET_CART_ITEM_LIST_ERROR,
      payload: "fetch error",
    });
  });
});

describe("장바구니 아이템 추가 및 수량 변경 요청 관련 dispatch action 테스트", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const CART_ITEM_LIST_TO_ADD = [
    {
      id: 4,
      quantity: 4,
    },
  ];

  const CART_ITEM_LIST_ADDED = [
    ...MOCK_CART_ITEM_LIST,
    {
      id: 4,
      thumbnailUrl:
        "https://cdn-mart.baemin.com/sellergoods/main/b21b12b2-6a90-4753-b8c2-11de4f55487b.png",
      name: "[든든] 국내산 사과 1팩(3입/1kg내외)",
      price: 6250,
      quantity: 4,
    },
  ];

  test("장바구니 아이템 추가 및 수량 변경 요청이 있으면, POST_CART_ITEM_PENDING 액션이 dispatch 되어야 한다.", async () => {
    server.use(
      rest.post(cartUrl, (req, res, ctx) => {
        return res(ctx.json(CART_ITEM_LIST_ADDED));
      })
    );

    await postCartItemByProductList(CART_ITEM_LIST_TO_ADD)(mockDispatch);
    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.POST_CART_ITEM_PENDING,
    });
  });

  test("장바구니 아이템 추가 및 수량 변경 요청이 성공하면, POST_CART_ITEM_SUCCESS 액션이 dispatch 되어야 한다.", async () => {
    server.use(
      rest.post(cartUrl, (req, res, ctx) => {
        return res(ctx.json(CART_ITEM_LIST_ADDED));
      })
    );

    await postCartItemByProductList(CART_ITEM_LIST_TO_ADD)(mockDispatch);
    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.POST_CART_ITEM_SUCCESS,
      payload: CART_ITEM_LIST_ADDED,
    });
  });

  test("장바구니 아이템 추가 및 수량 변경 요청이 실패하면, POST_CART_ITEM_ERROR 액션이 dispatch 되어야 한다.", async () => {
    server.use(
      rest.post(cartUrl, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    await postCartItemByProductList(CART_ITEM_LIST_TO_ADD)(mockDispatch);
    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.POST_CART_ITEM_ERROR,
      payload: "fetch error",
    });
  });
});

describe("장바구니 아이템 삭제하기 요청 관련 action dispatch 테스트", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const CART_ITEM_ID_LIST_TO_DELETE = [4];

  test("장바구니 아이템 삭제하기 요청이 있으면, DELETE_CART_ITEM_PENDING 액션이 dispatch 되어야 한다.", async () => {
    server.use(
      rest.delete(cartUrl, (req, res, ctx) => {
        return res(ctx.json(MOCK_CART_ITEM_LIST));
      })
    );

    await deleteCartItem(CART_ITEM_ID_LIST_TO_DELETE)(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.DELETE_CART_ITEM_PENDING,
    });
  });

  test("장바구니 아이템 삭제하기에 성공하면, DELETE_CART_ITEM_SUCCESS 액션이 dispatch 되어야 한다.", async () => {
    server.use(
      rest.delete(cartUrl, (req, res, ctx) => {
        return res(ctx.json(MOCK_CART_ITEM_LIST));
      })
    );

    await deleteCartItem(CART_ITEM_ID_LIST_TO_DELETE)(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.DELETE_CART_ITEM_SUCCESS,
      payload: MOCK_CART_ITEM_LIST,
    });
  });

  test("장바구니 아이템 삭제하기에 실패하면, DELETE_CART_ITEM_ERROR 액션이 dispatch 되어야 한다.", async () => {
    server.use(
      rest.delete(cartUrl, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    await deleteCartItem(CART_ITEM_ID_LIST_TO_DELETE)(mockDispatch);

    expect(mockDispatch).toBeCalledWith({
      type: ACTIONS.DELETE_CART_ITEM_ERROR,
      payload: "fetch error",
    });
  });
});
