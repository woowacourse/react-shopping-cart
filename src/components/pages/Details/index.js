import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE } from '../../../constants';
import ProductDetail from '../../ProductDetail';
import { handleCartButtonClick } from '../Products/index.actions';
import { Page, Main } from './index.styles';

const Details = ({ onImageError, match }) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.product.productDetail);
  const product_id = match.params.product_id;

  async function fetchProductDetail() {
    try {
      const response = await axios.get(
        `/api/products/${match.params.product_id}`
      );
      dispatch({
        type: ACTION_TYPE.PRODUCTS.GET_PRODUCT_DETAIL,
        productDetail: response.data,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchProductDetail();

    return () => {
      dispatch({ type: ACTION_TYPE.PRODUCTS.RESET_PRODUCT_DETAIL });
    };
  }, []);

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
