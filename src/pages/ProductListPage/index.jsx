import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import useReducerSelect from 'hooks/useReducerSelect';
import {getProductList} from 'store/modules/productList';
import {getCart} from 'store/modules/cart';

import Item from 'components/Item';
import Loader from 'components/Loader';

import Empty from 'assets/empty.png';

import {ProductListPageWrapper, ProductListWrapper} from 'pages/ProductListPage/style';
import ErrorPage from 'pages/ErrorPage';

export default function ProductListPage() {
  const {
    dispatch: productListDispatch,
    pending: productListPending,
    error: productListError,
    data: productList,
  } = useReducerSelect('productListReducer');
  const {
    dispatch: cartDispatch,
    pending: cartPending,
    error: cartError,
    data: cart,
  } = useReducerSelect('cartReducer');

  useEffect(() => {
    productListDispatch(getProductList());
    cartDispatch(getCart());
  }, []);

  if (productListPending || cartPending) return <Loader />;
  if (productListError || cartError) return <ErrorPage />;

  return (
    <ProductListPageWrapper>
      {productList.length ? (
        <ProductListWrapper>
          {productList.map(({id, image, name, price}) => {
            return (
              <Item
                itemImgURL={image}
                itemName={name}
                itemPrice={price}
                id={id}
                key={id}
                disabled={cart.some((cartItem) => +cartItem.id === id)}
              />
            );
          })}
        </ProductListWrapper>
      ) : (
        <img src={Empty} height="600px" />
      )}
    </ProductListPageWrapper>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
