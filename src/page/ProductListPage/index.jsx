import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Item from 'component/Item';
import Loader from 'component/Loader';
import PropTypes from 'prop-types';

import {ProductListPageWrapper} from 'page/ProductListPage/style';
import {getProductList} from 'store/modules/productList';

export default function ProductListPage() {
  useEffect(() => {
    fetchProductList();
  }, []);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productListReducer.productList);
  const pending = useSelector((state) => state.productListReducer.pending);

  const cart = useSelector((state) => state.cartReducer.cart);

  const fetchProductList = () => {
    dispatch(getProductList());
  };

  return (
    <ProductListPageWrapper>
      {pending && <Loader />}
      {!pending && !productList.length && <div>상품이 없어요.</div>}
      {productList.map(({id, image, name, price}) => (
        <Item
          itemImgURL={image}
          itemName={name}
          itemPrice={price}
          id={id}
          key={id}
          disabled={cart.some((obj) => obj.id === id)}
        />
      ))}
    </ProductListPageWrapper>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
