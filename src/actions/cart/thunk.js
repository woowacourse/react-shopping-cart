import { requestAddCart, requestGetCartList } from 'api/cart';
import { REQUEST_STATUS } from 'constants/';
import { addCartListAction, getCartListAction } from './action';

const getCartList = () => async (dispatch) => {
  dispatch(getCartListAction.pending());

  const { status, content } = await requestGetCartList();

  (status === REQUEST_STATUS.SUCCESS && dispatch(getCartListAction.success(content))) ||
    (status === REQUEST_STATUS.FAIL && dispatch(getCartListAction.error(content)));

  return true;
};

const addCartList =
  ({ id, image, name, price, quantity = 1, isChecked = true }) =>
  async (dispatch) => {
    dispatch(addCartListAction.pending());

    const { status, content } = await requestAddCart({
      id,
      image,
      name,
      price,
      quantity,
      isChecked,
    });

    (status === REQUEST_STATUS.SUCCESS && dispatch(addCartListAction.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(addCartListAction.error(content)));

    return true;
  };

export { getCartList, addCartList };
