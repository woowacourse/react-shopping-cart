import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import DetailItem from 'component/Item';
import PropTypes from 'prop-types';

import {ProductListPageWrapper} from 'page/ProductListPage/style';
import {getProductList} from 'store/modules/productList';
export default function ProductListPage() {
  useEffect(() => {
    fetchProductList();
  }, []);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productListReducer.productList);

  const fetchProductList = () => {
    dispatch(getProductList());
  };

  return (
    <ProductListPageWrapper>
      {productList.map(({id, image, name, price}) => (
        <DetailItem itemImgURL={image} itemName={name} itemPrice={price} id={id} key={id} />
      ))}
    </ProductListPageWrapper>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
