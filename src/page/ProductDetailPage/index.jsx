import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import DetailItem from 'component/DetailItem';
import useReducerSelect from 'hooks/useReducerSelect';

import {DetailItemPageWrapper} from 'page/ProductDetailPage/style';
import {getProductItem} from 'store/modules/productItem';
import Loading from 'component/Loader';
export default function ProductDetailPage() {
  const {dispatch, pending, error, data: productItem} = useReducerSelect('productItemReducer');

  const {id} = useParams();

  useEffect(() => {
    dispatch(getProductItem(id));
  }, []);

  return (
    <DetailItemPageWrapper>
      {pending && <Loading />}
      {!pending && (
        <DetailItem
          itemImgURL={productItem.image}
          itemName={productItem.name}
          itemPrice={productItem.price}
          id={id}
          disabled={productItem.disable}
        />
      )}
    </DetailItemPageWrapper>
  );
}

ProductDetailPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
