import cartReducer, { initialState } from 'redux/cart/cartReducer';
import ACTION_TYPE from 'redux/cart/cartActions';

const mockDatas = [
  {
    id: 1,
    image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
    name: '사과',
    price: 1000,
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/474x/2a/1f/a3/2a1fa32019c657c797ba60fe809e5550.jpg',
    name: '포도',
    price: 3500,
  },
];

const [apple, grape] = mockDatas;

describe('장바구니를 이용할 수 있다.', () => {
  test('상품을 장바구니에 추가할 수 있다.', () => {
    const action = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };

    const newState = cartReducer(initialState, action);

    expect(newState).toHaveProperty('products', [{ ...apple, quantity: 1 }]);
  });

  test('장바구니 상품의 수량을 증가시킬 수 있다.', () => {
    const action = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };

    const newStateAfterFirstAdd = cartReducer(initialState, action);
    const newStateAfterSecondAdd = cartReducer(newStateAfterFirstAdd, action);

    expect(newStateAfterSecondAdd).toHaveProperty('products', [{ ...apple, quantity: 2 }]);
  });

  test('장바구니 상품의 수량을 감소시킬 수 있다.', () => {
    const addAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
    const subtractAction = { type: ACTION_TYPE.SUBTRACT_CART_PRODUCT_QUANTITY, payload: apple };

    const newStateAfterFirstAdd = cartReducer(initialState, addAction);
    const newStateAfterSecondAdd = cartReducer(newStateAfterFirstAdd, addAction);
    const newStateAfterSubtract = cartReducer(newStateAfterSecondAdd, subtractAction);

    expect(newStateAfterSubtract).toHaveProperty('products', [{ ...apple, quantity: 1 }]);
  });

  test('모든 장바구니 상품을 선택 해제할 수 있다.', () => {
    const appleAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
    const grapeAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: grape };
    const selectAllAction = {
      type: ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK,
      payload: { checked: false },
    };

    const newStateAfterAddApple = cartReducer(initialState, appleAddAction);
    const newStateAfterAddGrape = cartReducer(newStateAfterAddApple, grapeAddAction);
    const newStateAfterSelectAll = cartReducer(newStateAfterAddGrape, selectAllAction);

    expect(newStateAfterSelectAll).toHaveProperty('isAllProductsChecked', false);
    expect(newStateAfterSelectAll).toHaveProperty('checkedProducts', []);
  });

  test('장바구니의 모든 상품을 선택할 수 있다.', () => {
    const appleAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
    const grapeAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: grape };
    const selectAllAction = {
      type: ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK,
      payload: { checked: true },
    };

    const newStateAfterAddApple = cartReducer(initialState, appleAddAction);
    const newStateAfterAddGrape = cartReducer(newStateAfterAddApple, grapeAddAction);
    const newStateAfterSelectAll = cartReducer(newStateAfterAddGrape, selectAllAction);

    expect(newStateAfterSelectAll).toHaveProperty('isAllProductsChecked', true);
    expect(newStateAfterSelectAll).toHaveProperty('checkedProducts', [
      { ...apple, quantity: 1 },
      { ...grape, quantity: 1 },
    ]);
  });

  test('장바구니 상품을 선택할 수 있다.', () => {
    const addAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
    const selectAction = { type: ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK, payload: { id: apple.id } };

    const newStateAfterAdd = cartReducer(initialState, addAction);
    const newStateAfterUnselect = cartReducer(newStateAfterAdd, selectAction);
    const newStateAfterSelect = cartReducer(newStateAfterUnselect, selectAction);

    expect(newStateAfterSelect).toHaveProperty('checkedProducts', [{ id: apple.id }]);
  });

  test('장바구니 상품을 선택 해제할 수 있다.', () => {
    const addAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
    const selectAction = { type: ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK, payload: { id: apple.id } };

    const newStateAfterAddApple = cartReducer(initialState, addAction);
    const newStateAfterSelectApple = cartReducer(newStateAfterAddApple, selectAction);

    expect(newStateAfterSelectApple).toHaveProperty('checkedProducts', []);
  });

  test('선택한 상품을 장바구니에서 삭제할 수 있다.', () => {
    const appleAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
    const grapeAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: grape };
    const unSelectAction = {
      type: ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK,
      payload: { id: apple.id },
    };
    const removeAction = { type: ACTION_TYPE.REMOVE_SELECTED_PRODUCTS_FROM_CART };

    const newStateAfterAddApple = cartReducer(initialState, appleAddAction);
    const newStateAfterAddGrape = cartReducer(newStateAfterAddApple, grapeAddAction);
    const newStateAfterSelectApple = cartReducer(newStateAfterAddGrape, unSelectAction);
    const newStateRemove = cartReducer(newStateAfterSelectApple, removeAction);

    expect(newStateRemove).toHaveProperty('products', [{ ...apple, quantity: 1 }]);
  });

  test('상품을 장바구니에서 삭제할 수 있다.', () => {
    const addAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
    const removeAction = { type: ACTION_TYPE.REMOVE_PRODUCT_FROM_CART, payload: { id: apple.id } };

    const newStateAfterAdd = cartReducer(initialState, addAction);
    const newStateAfterRemove = cartReducer(newStateAfterAdd, removeAction);

    expect(newStateAfterRemove).toHaveProperty('products', []);
  });
});
