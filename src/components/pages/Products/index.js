import React from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, Page } from './index.styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ROUTE } from '../../../constants';

const Products = () => {
  const { products } = useSelector(({ product }) => product);
  const history = useHistory();

  return (
    <Page>
      <ProductList>
        {products.map(product => (
          <ProductItem
            key={product.product_id}
            {...product}
            onProductClick={() =>
              history.push(ROUTE.PRODUCT_DETAIL, { product })
            }
          />
        ))}
      </ProductList>
    </Page>
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
