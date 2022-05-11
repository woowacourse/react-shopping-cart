import { ItemListActionType } from '../actions/itemList';
import axios from 'axios';
import { LOCAL_BASE_URL } from 'apis';

// @TODO : remove any
export const getItemList: any = () => async dispatch => {
  dispatch({ type: ItemListActionType.GET_ITEM_LIST_START });
  try {
    const response = await axios.get(`${LOCAL_BASE_URL}/itemList`);

    dispatch({
      type: ItemListActionType.GET_ITEM_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: ItemListActionType.GET_ITEM_LIST_FAILURE,
      payload: e.message,
    });
  }
};
