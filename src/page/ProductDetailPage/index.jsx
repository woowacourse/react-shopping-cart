import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import DetailItem from 'component/DetailItem';

import * as S from 'page/ProductDetailPage/style';
import useCartItem from 'hook/useCartItem';
import useFetch from 'hook/useFetch';
import {useParams} from 'react-router-dom';
import Loader from 'component/Loader';
import ErrorBoundary from 'component/ErrorBoundary';
import NotFoundPage from 'page/NotFoundPage';
import {useSelector} from 'react-redux';

export default function ProductDetailPage() {
  const {addCartItem} = useCartItem();
  const {id} = useParams();
  const {
    pending: getPending,
    data: getData,
    error: getError,
    fetch: getProductDetail,
  } = useFetch({
    API_URL: `${process.env.REACT_APP_PRODUCT_API_URL}/${id}`,
  });

  useEffect(() => {
    getProductDetail();
  }, []);

  const cartItem = useSelector((state) => state.cartReducer.cart);
  const isInCart = cartItem.some((item) => item.id === Number(id));

  const handleCartButtonClick = () => {
    const cartInfo = {
      itemImgURL: getData.image,
      itemName: getData.name,
      itemPrice: getData.price,
      id: Number(id),
      quantity: 1,
    };

    addCartItem(cartInfo);
  };

  return (
    <S.DetailItemPageLayout>
      {getPending && <Loader />}
      <ErrorBoundary
        fallback={<NotFoundPage>해당 상품이 없어요😢</NotFoundPage>}
        pending={getPending}
        error={getError}
      >
        {getData && (
          <DetailItem
            itemImgURL={getData.image}
            itemName={getData.name}
            itemPrice={getData.price}
            id={Number(id)}
            isInCart={isInCart}
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
