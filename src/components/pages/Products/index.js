import React from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, ProductPage } from './index.styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE, MESSAGE } from '../../../constants';

const Products = ({ products }) => {
  const dispatch = useDispatch();

  const handleCartButtonClick = product => {
    if (window.confirm(MESSAGE.PRODUCTS.ADD_TO_CART_CONFIRM)) {
      dispatch({ type: ACTION_TYPE.PRODUCTS.ADD_TO_CART, product });
      alert(MESSAGE.PRODUCTS.ADD_TO_CART_ALERT);
    }
  };

  return (
    <ProductPage>
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <ProductItem
              {...product}
              onCartButtonClick={handleCartButtonClick}
            />
          </li>
        ))}
      </ProductList>
    </ProductPage>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
};

export default Products;
