import React, { useEffect } from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, Page } from './index.styles';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE, ROUTE } from '../../../constants';
import axios from 'axios';
import { useHistory } from 'react-router';

const Products = () => {
  const products = useSelector(({ product }) => product.fetchedProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: 미들 웨어 적용
    async function fetchProducts() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + '/baskets'
        );

        dispatch({
          type: ACTION_TYPE.PRODUCTS.FETCH_PRODUCTS,
          products: response.data,
        });
      } catch (error) {
        //TODO: 상품을 못 받아 왔을 때, 안내 화면 띄우기
        console.error(error.message);
      }
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const handleProductClick = product => {
    history.push(ROUTE.PRODUCT_DETAIL, { product });
  };

  return (
    <Page>
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <ProductItem
              {...product}
              onProductClick={() => handleProductClick(product)}
            />
          </li>
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
