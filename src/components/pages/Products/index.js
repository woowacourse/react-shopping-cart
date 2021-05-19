import React from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, ProductPage } from './index.styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ACTION_TYPE } from '../../../constants';

const Products = ({ products }) => {
  const dispatch = useDispatch();

  const handleCartButtonClick = product => {
    dispatch({ type: ACTION_TYPE.PRODUCTS.ADD_TO_CART, product });
  };

  return (
    <ProductPage>
      <ProductList>
        {products.map(product => (
          <li key={product.product_id}>
            <ProductItem
              {...product}
              onCartButtonClick={() => handleCartButtonClick({ ...product })}
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
      product_id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
};

export default Products;
