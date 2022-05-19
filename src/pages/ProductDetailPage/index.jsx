import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import {getProductItem} from 'store/modules/productItem';
import useReducerSelect from 'hooks/useReducerSelect';
import useCart from 'hooks/useCart';

import {DetailItemPageWrapper} from 'pages/ProductDetailPage/style';
import ErrorPage from 'pages/ErrorPage';
import Loader from 'components/Loader';
import DetailItem from 'components/DetailItem';

export default function ProductDetailPage() {
  const {
    dispatch: productItemDispatch,
    pending: productItemPending,
    error: productItemError,
    data: productItem,
  } = useReducerSelect('productItemReducer');
  const {data: cart, getCartList} = useCart();

  const {id} = useParams();

  const disable = cart.some(({id: productId}) => productId === +id);

  useEffect(() => {
    productItemDispatch(getProductItem(id));
    getCartList();
  }, []);

  if (productItemPending) return <Loader />;
  if (productItemError) return <ErrorPage />;

  return (
    <DetailItemPageWrapper>
      {
        <DetailItem
          itemImgURL={productItem.image}
          itemName={productItem.name}
          itemPrice={productItem.price}
          id={id}
          disabled={disable}
        />
      }
    </DetailItemPageWrapper>
  );
}

ProductDetailPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
