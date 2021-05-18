import React, { useEffect } from 'react';
import ProductItem from '../../ProductItem';
import { ProductList, Page } from './index.styles';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE, MESSAGE, ROUTE } from '../../../constants';
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

  const handleCartButtonClick = (event, product) => {
    event.stopPropagation();
    if (window.confirm(MESSAGE.PRODUCTS.ADD_TO_CART_CONFIRM)) {
      dispatch({ type: ACTION_TYPE.PRODUCTS.ADD_TO_CART, product });
      alert(MESSAGE.PRODUCTS.ADD_TO_CART_ALERT);
    }
  };

  const history = useHistory();

  const handleProductClick = product => {
    history.push({
      pathname: ROUTE.PRODUCT_DETAIL,
      state: { product },
    });
  };

  return (
    <Page>
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <ProductItem
              {...product}
              onProductClick={() => handleProductClick(product)}
              onCartButtonClick={event => handleCartButtonClick(event, product)}
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
