const { SNACKBAR_ACTION_TYPE } = require('store/action/snackBarActions');

const initialMessage = { text: '' };

const snackBarReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case SNACKBAR_ACTION_TYPE.NEW_MESSAGE:
      return { text: action.payload.message };
    case SNACKBAR_ACTION_TYPE.CLEAR_MESSAGE:
      return { text: '' };
    default:
      return state;
  }
};

export default snackBarReducer;
