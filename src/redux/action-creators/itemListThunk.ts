import { ActionType, Action } from '../actions/itemList';
import axios from 'axios';
import { LOCAL_BASE_URL } from 'apis';

// @TODO : remove any
export const getItemList: any = () => async dispatch => {
  dispatch({ type: ActionType.GET_ITEMLIST_START });
  try {
    const response = await axios.get(`${LOCAL_BASE_URL}/itemList`);

    dispatch({
      type: ActionType.GET_ITEMLIST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: ActionType.GET_ITEMLIST_FAILURE,
      payload: e.message,
    });
  }
};
