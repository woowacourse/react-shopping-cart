import ACTION_TYPE from "../redux/actions";
import createAction from "../redux/createAction";
import reducer from "../redux/reducer";

const productList = [
  {
    sku: "83kW9mUr",
    name: "Apple Watch Series 5",
    price: 120,
    thumbnail_image: {
      url: "https://develoger.kr/wp-content/uploads/apple-watch-1.jpg",
      alt: "Apple Watch Series 5",
    },
  },
  {
    sku: "jBR5pmE5",
    name: "Apple Watch Nike",
    price: 400,
    thumbnail_image: {
      url: "https://develoger.kr/wp-content/uploads/apple-watch-nike.jpg",
      alt: "Apple Watch Nike",
    },
  },
];

const productObjs = productList.reduce((acc, cur) => {
  acc[cur.sku] = cur;
  return acc;
}, {});

const initialState = {
  productList,
  productObjs,
  cart: {},
};

describe("장바구니 리듀서 테스트", () => {
  test("상품 추가 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.", () => {
    const newState = reducer(
      initialState,
      createAction(ACTION_TYPE.ADD_PRODUCT_TO_CART, "jBR5pmE5")
    );

    expect(newState.cart).toEqual({
      jBR5pmE5: { quantity: 1, selected: false },
    });
  });

  test("장바구니에서 상품을 삭제한다", () => {
    // Cart에 상품을 먼저 추가한다
    const newInitialState = structuredClone(initialState);
    newInitialState.cart = {
      jBR5pmE5: { quantity: 1, selected: false },
    };

    const newState = reducer(
      newInitialState,
      createAction(ACTION_TYPE.DELETE_PRODUCT_IN_CART, "jBR5pmE5")
    );

    expect(newState.cart).toEqual({});
  });

  test("장바구니에서 상품을 하나 선택한다", () => {
    // Cart에 상품을 먼저 추가한다
    const newInitialState = structuredClone(initialState);
    newInitialState.cart = {
      jBR5pmE5: { quantity: 1, selected: false },
    };

    const newState = reducer(
      newInitialState,
      createAction(ACTION_TYPE.SELECT_PRODUCT_IN_CART, "jBR5pmE5")
    );

    expect(newState.cart["jBR5pmE5"].selected).toEqual(true);
  });

  test("장바구니에서 상품을 모두 선택한다", () => {
    // Cart에 상품을 먼저 추가한다
    const newInitialState = structuredClone(initialState);
    newInitialState.cart = {
      jBR5pmE5: { quantity: 1, selected: false },
      "83kW9mUr": { quantity: 1, selected: false },
    };

    const newState = reducer(
      newInitialState,
      createAction(ACTION_TYPE.SELECT_ALL_PRODUCTS_IN_CART)
    );

    const isAllSelected = Object.keys(newState.cart).some(
      (key) => newState.cart[key].selected
    );

    expect(isAllSelected).toEqual(true);
  });

  test("장바구니에서 상품을 하나 삭제한다", () => {
    // Cart에 상품을 먼저 추가한다
    const newInitialState = structuredClone(initialState);
    newInitialState.cart = {
      jBR5pmE5: { quantity: 1, selected: false },
    };

    const newState = reducer(
      newInitialState,
      createAction(ACTION_TYPE.DELETE_PRODUCT_IN_CART, "jBR5pmE5")
    );

    expect(newState.cart).toEqual({});
  });

  test("장바구니에서 선택된 상품을 모두 삭제한다", () => {
    const newInitialState = structuredClone(initialState);
    newInitialState.cart = {
      jBR5pmE5: { quantity: 1, selected: true },
      "83kW9mUr": { quantity: 1, selected: true },
    };

    const newState = reducer(
      newInitialState,
      createAction(ACTION_TYPE.DELETE_MULTIPLE_PRODUCTS_IN_CART, [
        "jBR5pmE5",
        "83kW9mUr",
      ])
    );

    expect(newState.cart).toEqual({});
  });
});
