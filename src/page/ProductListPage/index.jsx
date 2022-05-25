/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {getProductList, PRODUCT_LIST} from 'store/modules/productList';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import Item from 'component/Item';
import * as S from 'page/ProductListPage/style';
import Empty from 'assets/empty.png';

import useCartItem from 'hook/useCartItem';
import useFetch from 'hook/useFetch';
import {CART} from 'store/modules/cart';

export default function ProductListPage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productListReducer.productList);

  const {pending: productPending, error: productError, fetch: fetchProduct} = useFetch('get');

  const {fetch: fetchCart} = useFetch('get');

  useEffect(() => {
    fetchProduct({
      API_URL: process.env.REACT_APP_PRODUCT_API_URL,
      onSuccess: (fetchedData) => {
        dispatch({type: PRODUCT_LIST.INITIALIZE, payload: fetchedData});
      },
    });

    fetchCart({
      API_URL: process.env.REACT_APP_CART_API_URL,
      onSuccess: (fetchedData) => {
        dispatch({type: CART.INITIALIZE, payload: fetchedData});
      },
    });
  }, [dispatch, fetchProduct, fetchCart]);

  return (
    <S.ProductListPageLayout>
      <ErrorPendingBoundary
        fallback={<img src={Empty} alt="비어있음" height="600px" />}
        pending={productPending}
        error={productError}
      >
        <S.ProductListBox>
          {productList &&
            productList.map((productInfo) => (
              <Item productInfo={productInfo} key={productInfo.id} />
            ))}
        </S.ProductListBox>
      </ErrorPendingBoundary>
    </S.ProductListPageLayout>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
