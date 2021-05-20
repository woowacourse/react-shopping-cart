import { UPDATE_PAGE_INDEX } from '../actionType';

const initState = {
  pageIndex: 0,
};

const pageIndexReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_PAGE_INDEX: {
      return { ...state, pageIndex: action.pageIndex };
    }

    default:
      return state;
  }
};

export default pageIndexReducer;
