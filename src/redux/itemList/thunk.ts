import { BASE_URL } from 'apis';
import axios from 'axios';
import type { Dispatch } from 'redux';

import { ItemListAction, itemListActions } from './action';

export const getItemList = () => async (dispatch: Dispatch<ItemListAction>) => {
  dispatch(itemListActions.getItemListActionGroup.request());
  try {
    const response = await axios.get(`${BASE_URL}/itemList`);

    dispatch(itemListActions.getItemListActionGroup.success(response.data));
  } catch (e) {
    dispatch(itemListActions.getItemListActionGroup.failure(e.message));
  }
};
