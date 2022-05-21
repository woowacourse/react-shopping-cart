import { BASE_URL } from 'apis';
import axios from 'axios';
import type { Dispatch } from 'redux';

import { ItemListAction, itemListAction } from './action';

export const getItemList = () => async (dispatch: Dispatch<ItemListAction>) => {
  dispatch(itemListAction.getItemListStart());
  try {
    const response = await axios.get(`${BASE_URL}/itemList`);

    dispatch(itemListAction.getItemListSuccess(response.data));
  } catch (e) {
    dispatch(itemListAction.getItemListFailure(e.message));
  }
};
