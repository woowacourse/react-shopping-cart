import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';
import DetailItem from 'component/DetailItem';
import NotFoundPage from 'page/NotFoundPage';
import * as S from 'page/ProductDetailPage/style';

import useCartItem from 'hook/useCartItem';
import useFetch from 'hook/useFetch';

export default function ProductDetailPage() {
  const {id} = useParams();

  const {initializeCartList} = useCartItem();

  const {
    pending: getPending,
    data: getData,
    error: getError,
    fetch: getProductDetail,
  } = useFetch('get');

  useEffect(() => {
    getProductDetail({API_URL: `${process.env.REACT_APP_PRODUCT_API_URL}/${id}`});
    initializeCartList();
  }, [getProductDetail, initializeCartList, id]);

  return (
    <S.DetailItemPageLayout>
      <ErrorPendingBoundary
        fallback={<NotFoundPage>해당 상품이 없어요😢</NotFoundPage>}
        pending={getPending}
        error={getError}
      >
        {getData && <DetailItem productInfo={getData} />}
      </ErrorPendingBoundary>
    </S.DetailItemPageLayout>
  );
}

ProductDetailPage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
};
