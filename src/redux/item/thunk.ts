import { client } from 'apis';
import type { Dispatch } from 'redux';
import { Item } from 'types/domain';

import { ItemAction, itemActions } from './action';

export const getItemRequest = (id: string) => async (dispatch: Dispatch<ItemAction>) => {
  dispatch(itemActions.getItemActionGroup.request());
  try {
    const response = await client.get<Item>(`/itemList/${id}`);

    dispatch(itemActions.getItemActionGroup.success(response.data));
  } catch (e) {
    dispatch(itemActions.getItemActionGroup.failure(e.message));
  }
};
