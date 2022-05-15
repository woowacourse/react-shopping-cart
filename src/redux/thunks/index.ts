import { Dispatch } from 'redux';
import PATH from 'constants/path';
import SERVER_URL from 'configs/api';
import { actions } from 'redux/actions/actions';
import axios from 'axios';

const getProducts = (dispatch: Dispatch) => {
  dispatch(actions.getProductList());

  axios
    .get(`${SERVER_URL}${PATH.REQUEST_PRODUCT}`)
    .then((res) => {
      dispatch(actions.getProductListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(actions.getProductListError());
    });
};

export default getProducts;
