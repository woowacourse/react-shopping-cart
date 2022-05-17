import { Dispatch } from 'redux';
import PATH from 'constants/path';
import axios from 'axios';
import { productActions } from 'redux/actions/actions';

const getProducts = (dispatch: Dispatch) => {
  dispatch(productActions.getProductList());

  axios
    .get(`${PATH.REQUEST_PRODUCT}`)
    .then((res) => {
      dispatch(productActions.getProductListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productActions.getProductListError());
    });
};

const getProduct = (dispatch: Dispatch, id: string) => {
  dispatch(productActions.getProductDetail());

  axios
    .get(`${PATH.REQUEST_PRODUCT}/${id}`)
    .then((res) => {
      dispatch(productActions.getProductDetailSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productActions.getProductDetailError());
    });
};

export { getProducts, getProduct };
