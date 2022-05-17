import { 상품_불러오기_액션 } from 'actions/types';

const initialState = {
  item: {},
  errorMessage: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 상품_불러오기_액션.SUCCESS:
      return { ...state, item: { ...state.item, ...payload } };

    case 상품_불러오기_액션.FAILURE:
      return { ...state, errorMessage: payload };

    default:
      return state;
  }
};
