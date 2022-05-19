import React from 'react';
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
  const {pending, data, error} = useFetch(`${process.env.REACT_APP_PRODUCT_API_URL}/${id}`);
  const cartItem = useSelector((state) => state.cartReducer.cart);
  const isInCart = cartItem.some((item) => item.id === Number(id));

  const handleCartButtonClick = (isInCart) => {
    addCartItem({
      itemImgURL: data.image,
      itemName: data.name,
      itemPrice: data.price,
      id: Number(id),
      count: 1,
    });
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
