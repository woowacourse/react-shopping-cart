import {
  INCREASE_PAGE_INDEX,
  DECREASE_PAGE_INDEX,
  INIT_PAGE_INDEX,
} from '../actionType';

const initState = {
  pageIndex: 0,
};

const pageIndexReducer = (
  state = initState,
  action: {
    type: string;
    payload: {
      min: number;
      max: number;
    };
  }
) => {
  switch (action.type) {
    case INCREASE_PAGE_INDEX: {
      if (state.pageIndex + 1 > action.payload.max) return state;

      return { ...state, pageIndex: state.pageIndex + 1 };
    }
    case DECREASE_PAGE_INDEX: {
      if (state.pageIndex - 1 < action.payload.min) return state;

      return { ...state, pageIndex: state.pageIndex - 1 };
    }
    case INIT_PAGE_INDEX: {
      return { ...state, pageIndex: 0 };
    }
    default:
      return state;
  }
};

export default pageIndexReducer;
