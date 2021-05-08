import PropTypes from 'prop-types';
import React from 'react';
import { UNIT } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';
import ShoppingCart from '../../common/Icon/ShoppingCart';
import Product from '../../shared/Product';
import * as Styled from './style';

const ProductListPage = ({ products }) => {
  return (
    <Styled.ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <Product
            product={product}
            productDetail={{
              text: `${product.price.toLocaleString()} ${UNIT.MONEY}`,
              fontSize: '1.5rem',
            }}
            direction={'column'}
            size={'17.5rem'}
          >
            <Styled.CartButton>
              <ShoppingCart width={'2rem'} color={PALETTE.BLACK} />
            </Styled.CartButton>
          </Product>
        </li>
      ))}
    </Styled.ProductList>
  );
};

ProductListPage.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
      amount: PropTypes.number,
    })
  ),
};

export default ProductListPage;
