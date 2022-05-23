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
});
