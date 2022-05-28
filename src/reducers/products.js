import { 상품리스트_불러오기_액션 } from 'actions/types';

const initialState = {
  items: [],
  errorMessage: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 상품리스트_불러오기_액션.SUCCESS:
      return { items: [...state.items, ...payload] };

    case 상품리스트_불러오기_액션.FAILURE:
      return { errorMessage: payload };

    default:
      return state;
  }
};
