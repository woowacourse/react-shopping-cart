import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import {getProductList} from 'store/modules/productList';

import Item from 'component/Item';
import Loader from 'component/Loader';

import Empty from 'assets/empty.png';

import {ProductListPageWrapper, ProductListWrapper} from 'page/ProductListPage/style';

export default function ProductListPage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productListReducer.productList);
  const pending = useSelector((state) => state.productListReducer.pending);

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const cart = useSelector((state) => state.cartReducer.cart);

  return (
    <ProductListPageWrapper>
      {pending && <Loader />}
      {!pending &&
        (productList.length ? (
          <ProductListWrapper>
            {productList.map(({id, image, name, price}) => (
              <Item
                itemImgURL={image}
                itemName={name}
                itemPrice={price}
                id={id}
                key={id}
                disabled={cart.some((cartItem) => cartItem.id === id)}
              />
            ))}
          </ProductListWrapper>
        ) : (
          <img src={Empty} height="600px" />
        ))}
    </ProductListPageWrapper>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
