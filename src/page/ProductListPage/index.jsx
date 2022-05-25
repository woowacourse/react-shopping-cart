import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {PRODUCT_LIST} from 'store/modules/productList';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import Item from 'component/Item';
import * as S from 'page/ProductListPage/style';
import Empty from 'assets/empty.png';

import useCartItem from 'hook/useCartItem';
import useFetch from 'hook/useFetch';

export default function ProductListPage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productListReducer.productList);

  const {pending: productPending, error: productError, fetch: fetchProduct} = useFetch('get');

  const {initializeCart} = useCartItem();

  useEffect(() => {
    fetchProduct({
      API_URL: process.env.REACT_APP_PRODUCT_API_URL,
      onSuccess: (fetchedData) => {
        dispatch({type: PRODUCT_LIST.INITIALIZE, payload: fetchedData});
      },
    });
  }, [dispatch, fetchProduct]);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

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
