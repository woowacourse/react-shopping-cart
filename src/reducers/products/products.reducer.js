import actionTypes from 'reducers/products/products.actionTypes';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const productsReducer = (state = initialState, action) => {
  // loading을 false에서 true로 바꿔준다(로딩중 -> 스켈레톤 UI을 보여준다)
  if (action.type === actionTypes.GET_PRODUCTS) {
    return { ...state, isLoading: true };
  }
  // 스켈레톤 UI을 끈다. thunk를 통해 가져온 비동기 data를 넣어준다.
  if (action.type === actionTypes.GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }
  if (action.type === actionTypes.GET_PRODUCTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  return state;
};

export default productsReducer;
