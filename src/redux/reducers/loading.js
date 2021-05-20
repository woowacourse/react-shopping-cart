import { ACTIVATE_LOADING_SPINNER, DEACTIVATE_LOADING_SPINNER } from '../actionType';

const initState = {
  loading: false,
};

const loadingReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIVATE_LOADING_SPINNER: {
      return { ...state, loading: true };
    }
    case DEACTIVATE_LOADING_SPINNER: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default loadingReducer;
