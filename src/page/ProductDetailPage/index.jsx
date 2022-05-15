import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import DetailItem from 'component/DetailItem';

import {DetailItemPageWrapper} from 'page/ProductDetailPage/style';
import {getProductItem} from 'store/modules/productItem';
import Loading from 'component/Loader';
export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.productItemReducer.productItem);
  const pending = useSelector((state) => state.productItemReducer.pending);

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
