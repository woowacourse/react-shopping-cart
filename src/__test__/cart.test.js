import cartReducer, { initialState } from 'redux/cart/cartReducer';
import ACTION_TYPE from 'redux/cart/cartActions';

describe('장바구니를 이용할 수 있다.', () => {
  test('상품을 장바구니에 추가할 수 있다.', () => {
    const newState = addApple();

    expect(newState).toHaveProperty(PROPERTY.PRODUCTS, [{ ...apple, quantity: 1 }]);
  });

  test('장바구니 상품의 수량을 증가시킬 수 있다.', () => {
    const newState = addAppleTwice();

    expect(newState).toHaveProperty(PROPERTY.PRODUCTS, [{ ...apple, quantity: 2 }]);
  });

  test('장바구니 상품의 수량을 감소시킬 수 있다.', () => {
    const subtractAction = { type: ACTION_TYPE.SUBTRACT_CART_PRODUCT_QUANTITY, payload: apple };
    const newStateAfterAddTwice = addAppleTwice();

    const newStateAfterSubtract = cartReducer(newStateAfterAddTwice, subtractAction);

    expect(newStateAfterSubtract).toHaveProperty(PROPERTY.PRODUCTS, [{ ...apple, quantity: 1 }]);
  });

  test('모든 장바구니 상품을 선택 해제할 수 있다.', () => {
    const selectAllAction = {
      type: ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK,
      payload: { checked: false },
    };
    const newStateAfterAddAppleAndGrape = addAppleAndGrape();

    const newStateAfterSelectAll = cartReducer(newStateAfterAddAppleAndGrape, selectAllAction);

    expect(newStateAfterSelectAll).toHaveProperty(PROPERTY.CHECKED_PRODUCTS, []);
  });

  test('장바구니의 모든 상품을 선택할 수 있다.', () => {
    const selectAllAction = {
      type: ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK,
      payload: { checked: true },
    };
    const newStateAfterAddAppleAndGrape = addAppleAndGrape();

    const newStateAfterSelectAll = cartReducer(newStateAfterAddAppleAndGrape, selectAllAction);

    expect(newStateAfterSelectAll).toHaveProperty(PROPERTY.CHECKED_PRODUCTS, [
      { ...apple, quantity: 1 },
      { ...grape, quantity: 1 },
    ]);
  });

  test('장바구니 상품을 선택할 수 있다.', () => {
    const newStateAfterAdd = addApple();
    const newStateAfterUnselect = toggleApple(newStateAfterAdd);

    const newStateAfterSelect = toggleApple(newStateAfterUnselect);

    expect(newStateAfterSelect).toHaveProperty(PROPERTY.CHECKED_PRODUCTS, [{ id: apple.id }]);
  });

  test('장바구니 상품을 선택 해제할 수 있다.', () => {
    const newStateAfterAddApple = addApple();

    const newStateAfterSelectApple = toggleApple(newStateAfterAddApple);

    expect(newStateAfterSelectApple).toHaveProperty(PROPERTY.CHECKED_PRODUCTS, []);
  });

  test('선택한 상품을 장바구니에서 삭제할 수 있다.', () => {
    const removeAction = { type: ACTION_TYPE.REMOVE_SELECTED_PRODUCTS_FROM_CART };
    const newStateAfterAddGrape = addAppleAndGrape();
    const newStateAfterUnselectApple = toggleApple(newStateAfterAddGrape);

    const newStateRemove = cartReducer(newStateAfterUnselectApple, removeAction);

    expect(newStateRemove).toHaveProperty(PROPERTY.PRODUCTS, [{ ...apple, quantity: 1 }]);
  });

  test('상품을 장바구니에서 삭제할 수 있다.', () => {
    const removeAction = { type: ACTION_TYPE.REMOVE_PRODUCT_FROM_CART, payload: { id: apple.id } };
    const newStateAfterAdd = addApple();

    const newStateAfterRemove = cartReducer(newStateAfterAdd, removeAction);

    expect(newStateAfterRemove).toHaveProperty(PROPERTY.PRODUCTS, []);
  });
});

const PROPERTY = {
  PRODUCTS: 'products',
  CHECKED_PRODUCTS: 'checkedProducts',
};

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

const addApple = () => {
  const action = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };

  return cartReducer(initialState, action);
};

const addAppleTwice = () => {
  const action = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };

  const newStateAfterFirstAdd = cartReducer(initialState, action);
  const newStateAfterSecondAdd = cartReducer(newStateAfterFirstAdd, action);

  return newStateAfterSecondAdd;
};

const addAppleAndGrape = () => {
  const appleAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: apple };
  const grapeAddAction = { type: ACTION_TYPE.ADD_PRODUCT_TO_CART, payload: grape };

  const newStateAfterAddApple = cartReducer(initialState, appleAddAction);
  const newStateAfterAddGrape = cartReducer(newStateAfterAddApple, grapeAddAction);

  return newStateAfterAddGrape;
};

const toggleApple = prevState => {
  const toggleAction = { type: ACTION_TYPE.TOGGLE_CART_PRODUCT_CHECK, payload: { id: apple.id } };

  return cartReducer(prevState, toggleAction);
};
