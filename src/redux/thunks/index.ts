import { Dispatch } from 'redux';
import PATH from 'constants/path';
import { actions } from 'redux/actions/actions';
import axios from 'axios';

const getProducts = (dispatch: Dispatch) => {
  dispatch(actions.getProductList());

  axios
    .get(`${PATH.REQUEST_PRODUCT}`)
    .then((res) => {
      dispatch(actions.getProductListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(actions.getProductListError());
    });
};

const getProduct = (dispatch: Dispatch, id: string) => {
  dispatch(actions.getProductDetail());

  axios
    .get(`${PATH.REQUEST_PRODUCT}/${id}`)
    .then((res) => {
      dispatch(actions.getProductDetailSuccess(res.data));
    })
    .catch((err) => {
      dispatch(actions.getProductDetailError());
    });
};

export { getProducts, getProduct };
