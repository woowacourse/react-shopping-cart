import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import useProductList from 'hooks/useProductList';
import useCart from 'hooks/useCart';

import ErrorPage from 'pages/ErrorPage';
import Item from 'components/Item';
import Loader from 'components/Loader';

import Empty from 'assets/empty.png';

import {ProductListPageWrapper, ProductListWrapper} from 'pages/ProductListPage/style';
import {Image} from 'components/common/style';

export default function ProductListPage() {
  const {
    pending: productListPending,
    error: productListError,
    data: productList,
    getProducts,
  } = useProductList();
  const {getCartList, error: cartError, data: cart} = useCart();

  useEffect(() => {
    getProducts();
    getCartList();
  }, []);

  if (productListPending) return <Loader />;
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
                disabled={cart.some((cartItem) => cartItem.id === id)}
              />
            );
          })}
        </ProductListWrapper>
      ) : (
        <Image src={Empty} imgSize="l" />
      )}
    </ProductListPageWrapper>
  );
}

ProductListPage.propTypes = {
  itemList: PropTypes.array,
};
