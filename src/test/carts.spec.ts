import cartReducer, { actionCreators as cartActions, CartItemDetail } from "../redux/modules/cart";

const makeNewCartItem = ({ name, img, price, id }: CartItemDetail) => ({
  amount: 1,
  detail: {
    id,
    name,
    img,
    price,
  },
  isSelected: false,
});

const defaultCartItem = {
  amount: 1,
  detail: {
    id: 1,
    name: "initialCartItem",
    img: "imageUrl",
    price: 20000,
  },
  isSelected: false,
};

describe("cartReducer 테스트", () => {
  const initialState = {
    cartItemList: [defaultCartItem],
  };

  it("should handle addItem ", () => {
    const newProduct = {
      name: "newCartItem",
      price: 20000,
      img: "imageUrl",
      id: 2,
    };

    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      cartActions.addItem(newProduct)
    );
    expect(actual.cartItemList).toEqual([
      ...initialState.cartItemList,
      makeNewCartItem(newProduct),
    ]);
  });

  it("should handle deleteItem ", () => {
    const targetID = 1;
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      cartActions.deleteItem(targetID)
    );
    expect(actual.cartItemList.length).toEqual(0);
  });

  it("should handle increment ", () => {
    const targetID = 1;
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      cartActions.increment(targetID)
    );
    expect(actual.cartItemList[0].amount).toEqual(2);
  });

  it("should handle decrement ", () => {
    const targetID = 1;
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      cartActions.decrement(targetID)
    );
    expect(actual.cartItemList[0].amount).toEqual(0);
  });

  it("should handle toggleItemSelected ", () => {
    const targetID = 1;
    const actual = cartReducer(
      JSON.parse(JSON.stringify(initialState)),
      cartActions.toggleItemSelected(targetID, true)
    );
    expect(actual.cartItemList[0].isSelected).toEqual(true);
  });
});
