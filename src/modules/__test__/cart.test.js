import { cartReducer } from "../cart";

const cartItem = {
  id: "test",
  productId: 1,
  stock: 1,
  isChecked: false,
  price: 1000,
};

describe("cartList", () => {
  test("상품 추가 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.", () => {
    // given
    const initialCartItems = {
      isLoading: false,
      data: [],
      error: null,
    };
    const cartItem = {
      id: "test",
      productId: 1,
      stock: 1,
      isChecked: false,
      price: 1000,
    };
    const addCartAction = {
      type: "cart/POST_CART_SUCCESS",
      payload: cartItem,
    };

    // when
    // then
    expect(cartReducer(initialCartItems, addCartAction)).toEqual({
      isLoading: false,
      error: null,
      data: [cartItem],
    });
  });

  test("상품 개수 추가 요청이 들어오면 해당 상품 개수를 정상적으로 장바구니 상태에 추가해야 한다.", () => {
    // given
    const initialCartItems = {
      isLoading: false,
      data: [cartItem],
      error: null,
    };
    // when
    const patchCartStock = {
      type: "cart/PATCH_CART_STOCK",
      payload: { stockChanged: 2, targetId: "test" },
    };
    // then
    expect(cartReducer(initialCartItems, patchCartStock)).toEqual({
      isLoading: false,
      error: null,
      data: [{ ...cartItem, stock: 2 }],
    });
  });

  test("상품 체크 요청이 들어오면 해당 상품을 체크 상태로 만들어야 한다.", () => {
    // given
    const initialCartItems = {
      isLoading: false,
      data: [cartItem],
      error: null,
    };

    const patchCheckAction = {
      type: "cart/PATCH_CART_CHECK",
      payload: { isChecked: true, targetId: "test" },
    };

    // when
    // then
    expect(cartReducer(initialCartItems, patchCheckAction)).toEqual({
      isLoading: false,
      error: null,
      data: [{ ...cartItem, isChecked: true }],
    });
  });

  test("상품 삭제 요청이 들어오면 해당 상품을 장바구니에서 삭제해야 한다.", () => {
    // given
    const initialCartItems = {
      isLoading: false,
      data: [cartItem],
      error: null,
    };

    const deleteCartAction = {
      type: "cart/DELETE_CART",
      payload: "test",
    };

    // when
    // then
    expect(cartReducer(initialCartItems, deleteCartAction)).toEqual({
      isLoading: false,
      error: null,
      data: [],
    });
  });
});
