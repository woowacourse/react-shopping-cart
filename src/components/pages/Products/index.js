import React from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, ProductPage } from './index.styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { PRODUCTS } from '../../../constants/actionType';

const Products = ({ products }) => {
  const dispatch = useDispatch();

  const handleCartButtonClick = product => {
    dispatch({ type: PRODUCTS.ADD_TO_CART, product });
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
      id: PropTypes.number,
      image: PropTypes.string,
      imageAlt: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
};

export default Products;
