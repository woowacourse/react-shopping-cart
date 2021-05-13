import produce from 'immer';
import { TOGGLE_LIKE_PRODUCT } from '../actionType';

const initState = {
  likedProductIdList: [],
};

const likedProductIdListReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE_PRODUCT: {
      const { productId } = action;
      return produce(state, draft => {
        if (state.likedProductIdList.includes(productId)) {
          draft.likedProductIdList = draft.likedProductIdList.filter(id => id !== productId);
        } else {
          draft.likedProductIdList = [...draft.likedProductIdList, productId];
        }
      });
    }

    default:
      return state;
  }
};

export default likedProductIdListReducer;
