import { ItemListActionType, ItemListAction } from '../actions/itemList';
import axios from 'axios';
import { BASE_URL } from 'apis';
import type { Dispatch } from 'redux';

export const getItemList = () => async (dispatch: Dispatch<ItemListAction>) => {
  dispatch({ type: ItemListActionType.GET_ITEM_LIST_START });
  try {
    const response = await axios.get(`${BASE_URL}/itemList`);

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
