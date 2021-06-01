import produce from 'immer';
import { combineReducers } from 'redux';

const initialLocation = {
  currentPage: '/',
};

const redirectToHome = (state, action) => {
  console.log(action);
  const updater = produce(draft => {
    draft.currentPage = action.payload;
  });
  return updater(state);
};

const historyReducer = (state = initialLocation, action) => {
  switch (action.type) {
    case 'RESTRICT_DIRECT_ACCESS':
      return redirectToHome(state, action);
    default:
      return state;
  }
};

export default combineReducers({ history: historyReducer });
