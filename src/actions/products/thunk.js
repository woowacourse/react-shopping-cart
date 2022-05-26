import { requestGetProductList } from 'api/products';
import { REQUEST_STATUS } from 'constants/';

import * as productsAction from './action';

const getList =
  (page = 1) =>
  async (dispatch) => {
    dispatch(productsAction.getList.pending());

    const { status, content } = await requestGetProductList(page);

    (status === REQUEST_STATUS.SUCCESS && dispatch(productsAction.getList.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(productsAction.getList.error(content)));

    return true;
  };

export { getList };
