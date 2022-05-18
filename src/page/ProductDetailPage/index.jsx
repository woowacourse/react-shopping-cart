import React, {useState} from 'react';
import PropTypes from 'prop-types';

import DetailItem from 'component/DetailItem';

import * as S from 'page/ProductDetailPage/style';
import useCartItem from 'hook/useCartItem';
import useFetch from 'hook/useFetch';
import {useParams} from 'react-router-dom';
import Loader from 'component/Loader';
import ErrorBoundary from 'component/ErrorBoundary';
import NotFoundPage from 'page/NotFoundPage';

export default function ProductDetailPage() {
  const [disableStatus, setDisableStatus] = useState(false);
  const {addCartItem} = useCartItem();
  const {id} = useParams();
  const {pending, data, error} = useFetch(`${process.env.REACT_APP_PRODUCT_API_URL}/${id}`);

  const handleCartButtonClick = () => {
    addCartItem({
      itemImgURL: data.image,
      itemName: data.name,
      itemPrice: data.price,
      id,
      count: 1,
    });
    setDisableStatus(true);
  };

  return (
    <S.DetailItemPageLayout>
      {pending && <Loader />}
      <ErrorBoundary
        fallback={<NotFoundPage>해당 상품이 없어요😢</NotFoundPage>}
        pending={pending}
        error={error}
      >
        {data && (
          <DetailItem
            itemImgURL={data.image}
            itemName={data.name}
            itemPrice={data.price}
            id={id}
            disabled={disableStatus}
            handleCartButtonClick={handleCartButtonClick}
          />
        )}
      </ErrorBoundary>
    </S.DetailItemPageLayout>
  );
}

ProductDetailPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
