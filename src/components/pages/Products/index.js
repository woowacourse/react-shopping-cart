import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../../ProductItem';
import characterPng from '../../../assets/image/baemini.png';
import {
  ProductList,
  ProductPage,
  Loading,
  ImageWrapper,
  CharacterImage,
} from './index.styles';
import useProducts from '../../../hooks/useProducts';
import useLoading from '../../../hooks/useLoading';

const Products = () => {
  const { loading, timer } = useLoading();
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

  useEffect(() => {
    if (loading === false) return;
    timer();

    return clearTimeout(timer());
  }, [loading]);

  return (
    // TODO: pageWrapper 알아보기
    <ProductPage>
      {loading && (
        <Loading>
          <ImageWrapper>
            <CharacterImage src={characterPng} alt="character" />
          </ImageWrapper>
        </Loading>
      )}
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
