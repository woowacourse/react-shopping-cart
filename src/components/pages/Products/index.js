import React from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, Page } from './index.styles';
import PropTypes from 'prop-types';
import { useProduct } from '../../../hooks';

const Products = () => {
  const { products, error, addToCart, viewProductDetail } = useProduct();

  return (
    <Page>
      {error ? (
        <div>
          알 수 없는 문제가 발생했습니다. 만약 문제가 계속 발생한다면 관리자에게
          문의 주세요.
        </div>
      ) : (
        <ProductList>
          {products.map(product => (
            <ProductItem
              {...product}
              key={product.product_id}
              imageUrl={product.image_url}
              onCartButtonClick={() => addToCart(product)}
              onProductClick={() => viewProductDetail(product)}
            />
          ))}
        </ProductList>
      )}
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
