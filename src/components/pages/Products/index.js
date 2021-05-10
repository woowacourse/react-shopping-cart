import React from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, ProductPage } from './index.styles';
import PropTypes from 'prop-types';

const Products = ({ products }) => {
  return (
    <ProductPage>
      <ProductList>
        {products.map(({ id, ...product }) => (
          <li key={id}>
            <ProductItem {...product} />
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
