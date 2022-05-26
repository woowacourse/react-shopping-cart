import { client } from 'apis';
import { MAX_RESULT_ITEM_LIST } from 'constants/index';
import type { Dispatch } from 'redux';

import { PageItemListAction, pageItemListActions } from './action';

export const getPageItemListRequest =
  (id: string) => async (dispatch: Dispatch<PageItemListAction>) => {
    dispatch(pageItemListActions.getPageItemListActionGroup.request());
    try {
      const response = await client.get(`/itemList?_page=${id}&_limit=${MAX_RESULT_ITEM_LIST}`);

      dispatch(pageItemListActions.getPageItemListActionGroup.success(response.data));
    } catch (e) {
      dispatch(pageItemListActions.getPageItemListActionGroup.failure(e.message));
    }
  };
