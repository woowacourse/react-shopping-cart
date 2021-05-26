import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ProductItem from '../../ProductItem';
import { ProductList, ProductPage } from './index.styles';
import { fetchProducts, handleCartButtonClick } from './index.actions';
import { fetchCarts } from '../ShoppingCart/index.actions';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.product.fetchedProducts);
  const cartItems = useSelector(state => state.product.product.cartItems);

  useEffect(() => {
    fetchProducts()(dispatch);

    if (cartItems.length === 0) {
      fetchCarts()(dispatch);
    }
  }, []);

  return (
    <ProductPage>
      <ProductList>
        {products &&
          Object.values(products).map(product => {
            return (
              <li key={product.product_id}>
                <ProductItem
                  {...product}
                  onCartButtonClick={() =>
                    handleCartButtonClick({ ...product }, cartItems, dispatch)
                  }
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
