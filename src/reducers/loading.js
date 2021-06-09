import produce from 'immer';
import { combineReducers } from 'redux';

const initalLoading = {
  loading: false,
};

const loadingTimer = (state, action) => {
  const updater = produce(draft => {
    draft.loading = action.payload;
  });
  return updater(state);
};

const loadingReducer = (state = initalLoading, action) => {
  switch (action.type) {
    case 'LOADING':
      return loadingTimer(state, action);

    default:
      return state;
  }
};

export default combineReducers({ loading: loadingReducer });
