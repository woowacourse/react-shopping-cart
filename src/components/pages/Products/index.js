import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../ProductItem';
import { ProductList, ProductPage } from './index.styles';
import useProducts from '../../../hooks/useProducts';

const Products = () => {
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
    // TODO: pageWrapper 알아보기
    <ProductPage>
      <ProductList>
        {products &&
          Object.values(products).map(product => {
            return (
              <li key={product.product_id}>
                <ProductItem
                  {...product}
                  onCartButtonClick={() => addToCart(product)}
                />
              </li>
            );
          })}
      </ProductList>
    </ProductPage>
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
