import {
  INITIAL_STATE,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_SELECTED_PRODUCTS,
  TOGGLE_PRODUCT_SELECTION,
  TOGGLE_ALL_PRODUCTS_SELECTION,
  INCREMENT_PRODUCT_QUANTITY,
  DECREMENT_PRODUCT_QUANTITY,
  INPUT_PRODUCT_QUANTITY,
  CHECKOUT,
  cartAction,
  cartReducer,
} from './cartReducer';

const mockId = '1';
const mockProduct = {
  id: '1',
  name: 'PET보틀-정사각(420ml)',
  price: '43400',
  img: '/mockImages/img1.png',
};

const getMockState = (options = {}) => {
  const {
    id = '1',
    name = 'PET보틀-정사각(420ml)',
    price = '43400',
    img = '/mockImages/img1.png',
    quantity = 1,
    isSelected = true,
  } = options;

  return { [id]: { id, name, price, img, quantity, isSelected } };
};

describe('cartReducer 테스트', () => {
  /* 상품 추가/삭제 */
  it('addProduct 함수는 ADD_PRODUCT 타입의 액션을 생성한다.', () => {
    expect(cartAction.addProduct(mockProduct)).toEqual({
      type: ADD_PRODUCT,
      payload: mockProduct,
    });
  });

  it('ADD_PRODUCT 액션을 받을 경우, cartReducer는 해당 PRODUCT를 추가한 state를 반환한다.', () => {
    const prevState = INITIAL_STATE;
    const nextState = getMockState();

    expect(cartReducer(prevState, cartAction.addProduct(mockProduct))).toEqual(nextState);
  });

  it('removeProduct 함수는 REMOVE_PRODUCT 타입의 액션을 생성한다.', () => {
    expect(cartAction.removeProduct(mockId)).toEqual({
      type: REMOVE_PRODUCT,
      payload: mockId,
    });
  });

  it('REMOVE_PRODUCT 액션을 받을 경우, cartReducer는 해당 상품을 제거한 state를 반환한다.', () => {
    const prevState = getMockState();
    const nextState = INITIAL_STATE;

    expect(cartReducer(prevState, cartAction.removeProduct(mockId))).toEqual(nextState);
  });

  it('removeSelectedProducts 함수는 REMOVE_PRODUCT 타입의 액션을 생성한다.', () => {
    expect(cartAction.removeSelectedProducts()).toEqual({
      type: REMOVE_SELECTED_PRODUCTS,
    });
  });

  it('REMOVE_SELECTED_PRODUCTS 액션을 받을 경우, cartReducer는 해당 상품들을 제거한 state를 반환한다.', () => {
    const prevState = getMockState();
    const nextState = INITIAL_STATE;

    expect(cartReducer(prevState, cartAction.removeSelectedProducts())).toEqual(nextState);
  });

  /* 상품 선택/해제 */
  it('toggleProductSelection 함수는 TOGGLE_PRODUCT_SELECTION 타입의 액션을 생성한다.', () => {
    expect(cartAction.toggleProductSelection(mockId)).toEqual({
      type: TOGGLE_PRODUCT_SELECTION,
      payload: mockId,
    });
  });

  it('TOGGLE_PRODUCT_SELECTION 액션을 받을 경우, cartReducer는 해당 상품의 선택여부를 변경한다.', () => {
    const prevState = getMockState({ isSelected: true });
    const nextState = getMockState({ isSelected: false });

    expect(cartReducer(prevState, cartAction.toggleProductSelection(mockId))).toEqual(nextState);
  });

  it('toggleAllProductsSelection 함수는 TOGGLE_ALL_PRODUCTS_SELECTION 타입의 액션을 생성한다.', () => {
    expect(cartAction.toggleAllProductsSelection(false)).toEqual({
      type: TOGGLE_ALL_PRODUCTS_SELECTION,
      payload: false,
    });
  });

  it('TOGGLE_ALL_PRODUCTS_SELECTION 액션을 받을 경우, cartReducer는 모든 상품의 선택여부를 변경한다.', () => {
    const prevState = getMockState({ isSelected: true });
    const nextState = getMockState({ isSelected: false });

    expect(cartReducer(prevState, cartAction.toggleAllProductsSelection(false))).toEqual(nextState);
  });

  /* 상품 수량 조절 */

  it('incrementProductQuantity 함수는 INCREMENT_PRODUCT_QUANTITY 타입의 액션을 생성한다.', () => {
    expect(cartAction.incrementProductQuantity(mockId)).toEqual({
      type: INCREMENT_PRODUCT_QUANTITY,
      payload: mockId,
    });
  });

  it('INCREMENT_PRODUCT_QUANTITY 액션을 받을 경우, cartReducer는 해당 상품의 수량을 1 증가시킨다.', () => {
    const prevState = getMockState({ quantity: 1 });
    const nextState = getMockState({ quantity: 2 });

    expect(cartReducer(prevState, cartAction.incrementProductQuantity(mockId))).toEqual(nextState);
  });

  it('decrementProductQuantity 함수는 DECREMENT_PRODUCT_QUANTITY 타입의 액션을 생성한다.', () => {
    expect(cartAction.decrementProductQuantity(mockId)).toEqual({
      type: DECREMENT_PRODUCT_QUANTITY,
      payload: mockId,
    });
  });

  it('DECREMENT_PRODUCT_QUANTITY 액션을 받을 경우, cartReducer는 해당 상품의 수량을 1 감소시킨다.', () => {
    const prevState = getMockState({ quantity: 2 });
    const nextState = getMockState({ quantity: 1 });

    expect(cartReducer(prevState, cartAction.decrementProductQuantity(mockId))).toEqual(nextState);
  });

  it('inputProductQuantity 함수는 TOGGLE_ALL_PRODUCTS_SELECTION 타입의 액션을 생성한다.', () => {
    expect(cartAction.inputProductQuantity(mockId, 4)).toEqual({
      type: INPUT_PRODUCT_QUANTITY,
      payload: { id: mockId, quantity: 4 },
    });
  });

  it('INPUT_PRODUCT_QUANTITY 액션을 받을 경우, cartReducer는 해당 상품의 수량을 입력값으로 변경시킨다.', () => {
    const prevState = getMockState({ quantity: 1 });
    const nextState = getMockState({ quantity: 4 });

    expect(cartReducer(prevState, cartAction.inputProductQuantity(mockId, 4))).toEqual(nextState);
  });

  /* 주문 결제 */
  it('checkout 함수는 CHECKOUT 타입의 액션을 생성한다.', () => {
    expect(cartAction.checkout()).toEqual({
      type: CHECKOUT,
    });
  });

  it('CHECKOUT 액션을 받을 경우, cartReducer는 주문한 상품을 제외한 state를 반환한다.', () => {
    const prevState = getMockState();
    const nextState = INITIAL_STATE;

    expect(cartReducer(prevState, cartAction.checkout())).toEqual(nextState);
  });
});
