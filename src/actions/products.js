import { requestGetProductList, requestGetProduct } from 'api';
import { 비동기_요청 } from 'constants/';
import { 상품리스트_불러오기_액션, 상품_불러오기_액션 } from './types';

const getProductList = () => async (dispatch) => {
  const response = await requestGetProductList();

  if (response.status === 비동기_요청.FAILURE) {
    dispatch({
      type: 상품리스트_불러오기_액션.FAILURE,
      payload: response.content,
    });

    return;
  }

  dispatch({
    type: 상품리스트_불러오기_액션.SUCCESS,
    payload: response.content,
  });
};

const getProduct = (id) => async (dispatch) => {
  dispatch({
    type: 상품_불러오기_액션.PENDING,
  });

  const response = await requestGetProduct(id);

  if (response.status === 비동기_요청.FAILURE) {
    dispatch({
      type: 상품_불러오기_액션.FAILURE,
      payload: response.content,
    });

    return;
  }

  dispatch({
    type: 상품_불러오기_액션.SUCCESS,
    payload: response.content,
  });
};

export { getProductList, getProduct };
