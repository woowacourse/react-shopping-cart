import React from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../../../constants';
import ProductDetail from '../../ProductDetail';
import { Page, Main } from './index.styles';

const Details = ({ products, onImageError, match }) => {
  const product = products.find(
    ({ product_id }) => product_id === Number(match.params.product_id)
  );

  const dispatch = useDispatch();

  const handleCartButtonClick = product => {
    dispatch({ type: ACTION_TYPE.PRODUCTS.ADD_TO_CART, product });
  };

  return (
    <Page>
      <Main>
        <ProductDetail
          product={product}
          onImageError={onImageError}
          handleCartButtonClick={handleCartButtonClick}
        />
      </Main>
    </Page>
  );
};

export default Details;
