import {
  INITIAL_STATE,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_SELECTED_PRODUCTS,
  TOGGLE_PRODUCT_SELECTION,
  addProduct,
  removeProduct,
  removeSelectedProducts,
  toggleProductSelection,
  cartReducer,
} from './cartReducer';

const mockState = {
  1: {
    id: '1',
    name: 'PET보틀-정사각(420ml)',
    price: '43400',
    img: '/mockImages/img1.png',
    quantity: 1,
    isSelected: true,
  },
};

const mockProduct = {
  id: '1',
  name: 'PET보틀-정사각(420ml)',
  price: '43400',
  img: '/mockImages/img1.png',
};

const mockId = '1';

describe('cartReducer 테스트', () => {
  it('addProduct 함수는 ADD_PRODUCT 타입의 액션을 생성한다.', () => {
    expect(addProduct(mockProduct)).toEqual({
      type: ADD_PRODUCT,
      payload: mockProduct,
    });
  });

  it('ADD_PRODUCT 액션을 받을 경우, cartReducer는 해당 PRODUCT를 추가한 state를 반환한다.', () => {
    expect(cartReducer(INITIAL_STATE, addProduct(mockProduct))).toEqual(mockState);
  });

  it('removeProduct 함수는 REMOVE_PRODUCT 타입의 액션을 생성한다.', () => {
    expect(removeProduct(mockId)).toEqual({
      type: REMOVE_PRODUCT,
      payload: mockId,
    });
  });

  it('REMOVE_PRODUCT 액션을 받을 경우, cartReducer는 해당 PRODUCT를 제거한 state를 반환한다.', () => {
    expect(cartReducer(mockState, removeProduct(mockId))).toEqual(INITIAL_STATE);
  });

  it('removeSelectedProducts 함수는 REMOVE_PRODUCT 타입의 액션을 생성한다.', () => {
    expect(removeSelectedProducts()).toEqual({
      type: REMOVE_SELECTED_PRODUCTS,
    });
  });

  it('REMOVE_SELECTED_PRODUCTS 액션을 받을 경우, cartReducer는 해당 PRODUCT 들을 제거한 state를 반환한다.', () => {
    expect(cartReducer(mockState, removeSelectedProducts())).toEqual(INITIAL_STATE);
  });

  it('toggleProductSelection 함수는 TOGGLE_PRODUCT_SELECTION 타입의 액션을 생성한다.', () => {
    expect(toggleProductSelection(mockId)).toEqual({
      type: TOGGLE_PRODUCT_SELECTION,
      payload: mockId,
    });
  });

  it('TOGGLE_PRODUCT_SELECTION 액션을 받을 경우, cartReducer는 해당 PRODUCT 의 선택여부를 변경한다.', () => {
    expect(cartReducer(mockState, toggleProductSelection(mockId))).toEqual({
      ...mockState,
      [mockId]: { ...mockState[mockId], isSelected: false },
    });
  });
});
