import produce from 'immer';
import { combineReducers } from 'redux';
import { ACTION_TYPE, ROUTE } from '../constants';

const initialLocation = {
  currentPage: ROUTE.HOME,
};

const redirectToHome = (state, action) => {
  const updater = produce(draft => {
    draft.currentPage = action.payload;
  });
  return updater(state);
};

const historyReducer = (state = initialLocation, action) => {
  switch (action.type) {
    case ACTION_TYPE.URL.GET_URL:
      return redirectToHome(state, action);

    default:
      return state;
  }
};

export default combineReducers({ history: historyReducer });
