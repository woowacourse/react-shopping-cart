import { requestGetProductList } from 'api/products';
import { REQUEST_STATUS } from 'constants/';

import { getProductListAction } from './action';

const getProductList =
  (page = 1) =>
  async (dispatch) => {
    dispatch(getProductListAction.pending());

    const { status, content } = await requestGetProductList(page);

    (status === REQUEST_STATUS.SUCCESS && dispatch(getProductListAction.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(getProductListAction.error(content)));

    return true;
  };

export { getProductList };
