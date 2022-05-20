import cartReducer, {
  addItem,
  CartState,
  decrement,
  deleteItem,
  increment,
  selectItem,
} from "../modules/cart";

describe("장바구니 리듀서 테스트", () => {
  const initialState: CartState = {
    cartItems: [],
  };

  const cartList = [
    {
      name: "올인원 세트-물티수저",
      price: 50000,
      img: "https://user-images.githubusercontent.com/48676844/167996022-3b18c5ac-bedd-46ae-8356-aab0981a017d.jpeg",
      id: 0,
      amount: 1,
      isSelected: false,
    },
    {
      name: "수저젓가락 세트(딱!편해)",
      price: 50000,
      img: "https://cdn-mart.baemin.com/sellergoods/main/3d08d94f-2c0a-42f0-b517-6a0af7703b0b.jpg",
      id: 1,
      amount: 2,
      isSelected: true,
    },
  ];

  test("상품 추가 요청이 들어오면 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.", () => {
    expect(cartReducer(initialState, addItem(cartList[0]))).toEqual({ cartItems: [cartList[0]] });
  });

  test("상품 삭제 요청이 들어오면 해당 상품을 정상적으로 장바구니에서 삭제해야 한다.", () => {
    const id = 0;
    const newState = cartReducer(initialState, addItem(cartList[id]));
    expect(cartReducer(newState, deleteItem(id))).toEqual({ cartItems: [] });
  });

  test("상품 증가 요청이 들어오면 해당 상품 장바구니 개수를 정상적으로 증가시켜야 한다.", () => {
    const id = 0;
    const newState = cartReducer(initialState, addItem(cartList[id]));
    const newItems = [{ ...cartList[id], amount: 2 }];

    expect(cartReducer(newState, increment(id))).toEqual({ cartItems: newItems });
  });

  test("상품 차감 요청이 들어오면 해당 상품 장바구니 개수를 정상적으로 차감시켜야 한다.", () => {
    const id = 1;
    const newState = cartReducer(initialState, addItem(cartList[id]));
    const newItems = [{ ...cartList[id], amount: 1 }];

    expect(cartReducer(newState, decrement(id))).toEqual({ cartItems: newItems });
  });

  test("상품 선택 요청이 들어오면 해당 상품 선택 상태를 정상적으로 변경해야 한다.", () => {
    const id = 0;
    const newState = cartReducer(initialState, addItem(cartList[id]));
    const newItems = [{ ...cartList[id], isSelected: true }];

    expect(cartReducer(newState, selectItem(id))).toEqual({ cartItems: newItems });
  });
});
