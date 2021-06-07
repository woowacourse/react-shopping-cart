import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../ProductItem';
import { ProductList } from './index.styles';
import useProducts from '../../../hooks/useProducts';
import useLoading from '../../../hooks/useLoading';
import Loading from '../../@common/Loading';
import { Page } from '../../@common/PageWrapper/index.styles';

const Products = () => {
  const { loading, show } = useLoading();
  const {
    products,
    cartItems,
    updateProductState,
    updateCartState,
    updateProductURL,
    addToCart,
  } = useProducts();

  useEffect(() => {
    updateProductURL();
    updateProductState();

    if (cartItems.length !== 0) return;
    updateCartState();
  }, []);

  return (
    <Page noPadding={true}>
      {loading && <Loading />}
      <ProductList>
        {products &&
          Object.values(products).map(product => {
            return (
              <li key={product.product_id}>
                <ProductItem
                  {...product}
                  onCartButtonClick={() => addToCart(product, show)}
                />
              </li>
            );
          })}
      </ProductList>
    </Page>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
};

export default Products;
