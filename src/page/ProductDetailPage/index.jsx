import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import DetailItem from 'component/DetailItem';
import NotFoundPage from 'page/NotFoundPage';
import * as S from 'page/ProductDetailPage/style';

import useFetch from 'hook/useFetch';
import useCartItem from 'hook/useCartItem';

export default function ProductDetailPage() {
  const {id} = useParams();

  const {initializeCart} = useCartItem();

  const {
    pending: detailPending,
    data: detailProduct,
    error: detailError,
    fetch: fetchProductDetail,
  } = useFetch('get');

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  useEffect(() => {
    fetchProductDetail({API_URL: `${process.env.REACT_APP_PRODUCT_API_URL}/${id}`});
  }, [fetchProductDetail, id]);

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
