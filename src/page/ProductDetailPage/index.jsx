import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import DetailItem from 'component/DetailItem';
import NotFoundPage from 'page/NotFoundPage';
import * as S from 'page/ProductDetailPage/style';

import useFetch from 'hook/useFetch';
import {useDispatch} from 'react-redux';
import {CART} from 'store/modules/cart';

export default function ProductDetailPage() {
  const {id} = useParams();
  const dispatch = useDispatch();

  const {fetch: fetchCart} = useFetch('get');

  const {
    pending: detailPending,
    data: detailProduct,
    error: detailError,
    fetch: fetchProductDetail,
  } = useFetch('get');

  useEffect(() => {
    fetchProductDetail({API_URL: `${process.env.REACT_APP_PRODUCT_API_URL}/${id}`});

    fetchCart({
      API_URL: process.env.REACT_APP_CART_API_URL,
      onSuccess: (fetchedData) => {
        dispatch({type: CART.INITIALIZE, payload: fetchedData});
      },
    });
  }, [fetchProductDetail, id, dispatch, fetchCart]);

  return (
    <S.DetailItemPageLayout>
      <ErrorPendingBoundary
        fallback={<NotFoundPage>해당 상품이 없어요😢</NotFoundPage>}
        pending={detailPending}
        error={detailError}
      >
        {detailProduct && <DetailItem productInfo={detailProduct} />}
      </ErrorPendingBoundary>
    </S.DetailItemPageLayout>
  );
}

ProductDetailPage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
};
