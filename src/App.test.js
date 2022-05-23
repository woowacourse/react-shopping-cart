import { cartListReducer } from "@/redux/reducers";
import {
  ADD_PRODUCT_TO_CART,
  INCREMENT_CART_ITEM_QUANTITY,
  DECREMENT_CART_ITEM_QUANTITY,
  REMOVE_ROW_CART_ITEM,
} from "@/redux/types";

describe("action에 맞춰서 상태를 의도한대로 잘 변경하는지 확인한다.", () => {
  test("상품 추가 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.", () => {
    const initialCartItems = [];
    const product = {
      id: 1,
      name: "붙이는 치약 홀더 / 걸이",
      price: 1600,
      imgUrl:
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163178721379405896.jpg?gif=1&w=512&h=512&c=c",
    };

    const addProductAction = {
      type: ADD_PRODUCT_TO_CART,
      payload: {
        ...product,
      },
    };

    expect(cartListReducer(initialCartItems, addProductAction)).toEqual([
      {
        ...product,
        quantity: 1,
        checked: true,
      },
    ]);
  });

  test("장바구니에 있는 특정 상품의 개수를 1개 증가시키고, 상태에 반영한다.", () => {
    const product = {
      id: 1,
      name: "붙이는 치약 홀더 / 걸이",
      price: 1600,
      imgUrl:
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163178721379405896.jpg?gif=1&w=512&h=512&c=c",
      quantity: 1,
      checked: true,
    };

    const initialCartItems = [product];

    const incrementCartItemQuantityAction = {
      type: INCREMENT_CART_ITEM_QUANTITY,
      payload: 1,
    };

    expect(
      cartListReducer(initialCartItems, incrementCartItemQuantityAction)
    ).toEqual([
      {
        ...product,
        quantity: 2,
        checked: true,
      },
    ]);
  });

  test("장바구니에 있는 특정 상품의 개수를 1개 감소시키고, 상태에 반영한다.", () => {
    const product = {
      id: 1,
      name: "붙이는 치약 홀더 / 걸이",
      price: 1600,
      imgUrl:
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163178721379405896.jpg?gif=1&w=512&h=512&c=c",
      quantity: 2,
      checked: true,
    };

    const initialCartItems = [product];

    const decrementCartItemQuantityAction = {
      type: DECREMENT_CART_ITEM_QUANTITY,
      payload: 1,
    };

    expect(
      cartListReducer(initialCartItems, decrementCartItemQuantityAction)
    ).toEqual([
      {
        ...product,
        quantity: 1,
        checked: true,
      },
    ]);
  });

  test("장바구니에 있는 특정 상품을 삭제하고, 상태에 반영한다.", () => {
    const product = {
      id: 1,
      name: "붙이는 치약 홀더 / 걸이",
      price: 1600,
      imgUrl:
        "https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/163178721379405896.jpg?gif=1&w=512&h=512&c=c",
      quantity: 2,
      checked: true,
    };

    const initialCartItems = [product];

    const removeRowCartItemAction = {
      type: REMOVE_ROW_CART_ITEM,
      payload: 1,
    };

    expect(cartListReducer(initialCartItems, removeRowCartItemAction)).toEqual(
      []
    );
  });
});
